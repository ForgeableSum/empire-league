import type { PlayerProfile } from "../../shared/contracts/players";
import type { QueueEventListener, UnsubscribeFunction } from "../../shared/contracts/matchmaking";

const matchmakerUrl = (
  import.meta.env.DEV
    ? (import.meta.env.VITE_MATCHMAKER_URL ?? "http://127.0.0.1:4317")
    : "http://matchmaker.empireleague.gg"
).replace(/\/$/, "");

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
}

interface Subscription {
  ticketId: string;
  after: number;
  listener: QueueEventListener;
}

export class MatchmakerTransportError extends Error {
  constructor(message: string, readonly status?: number, readonly code?: string) {
    super(message);
    this.name = "MatchmakerTransportError";
  }
}

export type MatchmakerConnectionStatus = "disconnected" | "connecting" | "connected";

export type SocialEvent =
  | { type: "snapshot"; snapshot: import("./socialService").SocialSnapshot }
  | { type: "presence"; playerId: string; presence: import("../pages/SocialPage").FriendPresence; activity: string; mapName?: string }
  | { type: "message"; message: import("./socialService").SocialMessage };
export type CustomLobbyEvent = {
  type: "rooms_changed";
  rooms: import("../../shared/contracts/customLobby").CustomLobbyRoom[];
  closedRoomId?: string;
  closeReason?: string;
};
export type AdminMessage = { message: string; sentAt: string };

class MatchmakerTransport {
  private token: string | null = null;
  private socket: WebSocket | null = null;
  private connectPromise: Promise<void> | null = null;
  private connectResolve: (() => void) | null = null;
  private connectReject: ((reason: Error) => void) | null = null;
  private pending = new Map<string, PendingRequest>();
  private subscription: Subscription | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  private deliberatelyClosed = false;
  private socialListeners = new Set<(event: SocialEvent) => void>();
  private customLobbyListeners = new Set<(event: CustomLobbyEvent) => void>();
  private adminMessageListeners = new Set<(event: AdminMessage) => void>();
  private connectionStatus: MatchmakerConnectionStatus = "disconnected";
  private connectionStatusListeners = new Set<() => void>();

  getConnectionStatus = (): MatchmakerConnectionStatus => this.connectionStatus;

  onConnectionStatusChange = (listener: () => void): UnsubscribeFunction => {
    this.connectionStatusListeners.add(listener);
    return () => this.connectionStatusListeners.delete(listener);
  };

  setToken(token: string | null): void {
    if (this.token === token) return;
    this.token = token;
    this.disconnect("Authentication changed.");
  }

  async request<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
    await this.connect();
    const socket = this.socket;
    if (!socket || socket.readyState !== WebSocket.OPEN) throw new Error("Matchmaker connection is unavailable.");
    const id = crypto.randomUUID();
    const result = new Promise<T>((resolve, reject) => {
      this.pending.set(id, {
        resolve: (value) => resolve(value as T),
        reject
      });
    });
    socket.send(JSON.stringify({
      type: "request",
      id,
      method: options.method ?? "GET",
      path,
      body: options.body
    }));
    return result;
  }

  subscribe(ticketId: string, listener: QueueEventListener): UnsubscribeFunction {
    this.subscription = { ticketId, after: 0, listener };
    void this.connect().then(() => this.sendSubscription()).catch((error: unknown) => {
      this.failSubscription(error instanceof Error ? error.message : "Matchmaker connection failed.");
    });
    return () => {
      if (this.subscription?.ticketId === ticketId) this.subscription = null;
      if (this.reconnectTimer !== null) window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    };
  }

  onSocialEvent(listener: (event: SocialEvent) => void): UnsubscribeFunction {
    this.socialListeners.add(listener);
    return () => this.socialListeners.delete(listener);
  }

  onCustomLobbyEvent(listener: (event: CustomLobbyEvent) => void): UnsubscribeFunction {
    this.customLobbyListeners.add(listener);
    return () => this.customLobbyListeners.delete(listener);
  }

  onAdminMessage(listener: (event: AdminMessage) => void): UnsubscribeFunction {
    this.adminMessageListeners.add(listener);
    return () => this.adminMessageListeners.delete(listener);
  }

  private connect(): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN && !this.connectPromise) return Promise.resolve();
    if (this.connectPromise) return this.connectPromise;
    this.deliberatelyClosed = false;
    this.setConnectionStatus("connecting");
    this.connectPromise = new Promise<void>((resolve, reject) => {
      this.connectResolve = resolve;
      this.connectReject = reject;
    });
    const url = new URL("/events", matchmakerUrl);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const socket = new WebSocket(url);
    this.socket = socket;

    socket.addEventListener("open", () => {
      if (this.token) socket.send(JSON.stringify({ type: "authenticate", token: this.token }));
      else this.finishConnecting();
    });
    socket.addEventListener("message", (event) => this.onMessage(socket, event));
    socket.addEventListener("error", () => socket.close());
    socket.addEventListener("close", () => this.onClose(socket));
    return this.connectPromise;
  }

  private onMessage(socket: WebSocket, event: MessageEvent): void {
    if (socket !== this.socket) return;
    let message: {
      type?: string;
      id?: string;
      status?: number;
      body?: unknown;
      code?: string;
      message?: string;
      ticketId?: string;
      sequence?: number;
      event?: Parameters<QueueEventListener>[0] | SocialEvent | CustomLobbyEvent;
      sentAt?: string;
    };
    try {
      message = JSON.parse(String(event.data));
    } catch {
      this.disconnect("The matchmaker sent invalid data.");
      return;
    }
    if (message.type === "authenticated") {
      this.finishConnecting();
      return;
    }
    if (message.type === "social_event" && message.event) {
      for (const listener of this.socialListeners) listener(message.event as SocialEvent);
      return;
    }
    if (message.type === "custom_lobby_event" && message.event) {
      for (const listener of this.customLobbyListeners) listener(message.event as CustomLobbyEvent);
      return;
    }
    if (message.type === "admin_message" && typeof message.message === "string") {
      for (const listener of this.adminMessageListeners) listener({ message: message.message, sentAt: message.sentAt ?? new Date().toISOString() });
      return;
    }
    if (message.type === "response" && message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if ((message.status ?? 500) >= 400) {
        const body = message.body as { error?: string } | null;
        pending.reject(new MatchmakerTransportError(
          body?.error ?? `Matchmaker request failed (${message.status}).`,
          message.status
        ));
      } else {
        pending.resolve(message.body);
      }
      return;
    }
    if (message.type === "subscribed") {
      this.reconnectAttempts = 0;
      return;
    }
    if (message.type === "event" && this.subscription
      && message.ticketId === this.subscription.ticketId
      && message.event && Number.isSafeInteger(message.sequence)) {
      this.subscription.after = Math.max(this.subscription.after, message.sequence ?? 0);
      this.subscription.listener(message.event as Parameters<QueueEventListener>[0]);
      return;
    }
    if (message.type === "error") {
      const detail = message.message ?? message.code ?? "Matchmaker WebSocket error.";
      if (this.connectReject) this.rejectConnecting(new MatchmakerTransportError(detail, undefined, message.code));
      else this.failSubscription(detail, message.code);
    }
  }

  private finishConnecting(): void {
    const resolve = this.connectResolve;
    this.connectPromise = null;
    this.connectResolve = null;
    this.connectReject = null;
    this.reconnectAttempts = 0;
    this.setConnectionStatus("connected");
    resolve?.();
    this.sendSubscription();
  }

  private rejectConnecting(error: Error): void {
    const reject = this.connectReject;
    this.connectPromise = null;
    this.connectResolve = null;
    this.connectReject = null;
    reject?.(error);
  }

  private sendSubscription(): void {
    if (!this.subscription || this.socket?.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify({
      type: "subscribe",
      ticketId: this.subscription.ticketId,
      after: this.subscription.after
    }));
  }

  private onClose(socket: WebSocket): void {
    if (socket !== this.socket) return;
    this.socket = null;
    this.setConnectionStatus("disconnected");
    this.rejectConnecting(new Error("Matchmaker connection closed."));
    for (const pending of this.pending.values()) pending.reject(new Error("Matchmaker connection closed."));
    this.pending.clear();
    if (this.deliberatelyClosed || !this.subscription) return;
    this.reconnectAttempts += 1;
    if (this.reconnectAttempts > 15) {
      this.failSubscription("The connection to the matchmaker was lost.");
      return;
    }
    const delay = Math.min(500 * 2 ** (this.reconnectAttempts - 1), 8_000) + Math.floor(Math.random() * 250);
    this.reconnectTimer = window.setTimeout(() => void this.connect().catch(() => undefined), delay);
  }

  private disconnect(reason: string): void {
    this.deliberatelyClosed = true;
    if (this.reconnectTimer !== null) window.clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    this.socket?.close(1000, reason);
    this.socket = null;
    this.setConnectionStatus("disconnected");
    this.rejectConnecting(new Error(reason));
    for (const pending of this.pending.values()) pending.reject(new Error(reason));
    this.pending.clear();
  }

  private failSubscription(message: string, code = "MATCHMAKER_UNAVAILABLE"): void {
    const subscription = this.subscription;
    this.subscription = null;
    subscription?.listener({ type: "error", code, message });
  }

  private setConnectionStatus(status: MatchmakerConnectionStatus): void {
    if (this.connectionStatus === status) return;
    this.connectionStatus = status;
    for (const listener of this.connectionStatusListeners) listener();
  }
}

export const matchmakerTransport = new MatchmakerTransport();
export type AuthenticatedSocketResult = { player: PlayerProfile };
