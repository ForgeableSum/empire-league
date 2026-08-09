declare module "ws" {
  export default class WebSocket {
    static readonly OPEN: number;
    readonly readyState: number;
    constructor(address: string, protocol?: string, options?: { handshakeTimeout?: number });
    on(event: "message", listener: (data: { toString(): string }) => void): this;
    on(event: string, listener: (...args: unknown[]) => void): this;
    once(event: "error", listener: (error: Error) => void): this;
    once(event: "close", listener: (code: number) => void): this;
    removeListener(event: string, listener: (...args: never[]) => void): this;
    send(data: string): void;
    close(): void;
  }
}
