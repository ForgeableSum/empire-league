import { Check, Clock3, Gamepad2, MessageCircle, Search, Send, UserMinus, UserPlus, Users, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

export type FriendPresence = "online" | "in_game" | "idle" | "offline";

export interface SocialFriend {
  id: string;
  name: string;
  initials: string;
  rating: number;
  presence: FriendPresence;
  activity: string;
  lastSeen?: string;
  unread?: number;
  avatarUrl?: string;
  mutualFriends?: number;
  mapName?: string;
}

export interface FriendRequest {
  id: string;
  name: string;
  initials: string;
  rating: number;
  mutualFriends: number;
  connectionId: string;
  avatarUrl?: string;
}

interface SocialPageProps {
  friends: SocialFriend[];
  requests: FriendRequest[];
  onMessage: (friend: SocialFriend) => void;
  onAccept: (request: FriendRequest) => void;
  onDecline: (id: string) => void;
  onInvite: (name: string) => Promise<string>;
  onPartyInvite: (friend: SocialFriend) => void;
  onUnfriend: (friend: SocialFriend) => void;
}

export function SocialPage({ friends, requests, onMessage, onAccept, onDecline, onInvite, onPartyInvite, onUnfriend }: SocialPageProps) {
  const [query, setQuery] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteSent, setInviteSent] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [invitePending, setInvitePending] = useState(false);
  const [pendingUnfriend, setPendingUnfriend] = useState<SocialFriend | null>(null);
  const [filter, setFilter] = useState<"all" | "online" | "in_game">("all");

  const visibleFriends = useMemo(() => friends.filter((friend) => {
    const matchesSearch = friend.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesFilter = filter === "all"
      || (filter === "online" && friend.presence !== "offline")
      || friend.presence === "in_game";
    return matchesSearch && matchesFilter;
  }), [filter, friends, query]);

  async function submitInvite(event: FormEvent) {
    event.preventDefault();
    const name = inviteName.trim();
    if (!name) return;
    setInvitePending(true);
    setInviteError(null);
    setInviteSent(null);
    try {
      const verifiedName = await onInvite(name);
      setInviteSent(verifiedName);
      setInviteName("");
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : "The invite could not be sent.");
    } finally {
      setInvitePending(false);
    }
  }

  const onlineCount = friends.filter((friend) => friend.presence !== "offline").length;
  const inGameCount = friends.filter((friend) => friend.presence === "in_game").length;

  return (
    <section className="social-layout">
      <div className="social-main stack">
        <div className="social-summary">
          <button className={filter === "all" ? "social-stat active" : "social-stat"} onClick={() => setFilter("all")} type="button">
            <Users size={19} /><span><strong>{friends.length}</strong> Friends</span>
          </button>
          <button className={filter === "online" ? "social-stat active" : "social-stat"} onClick={() => setFilter("online")} type="button">
            <span className="presence-dot online" /><span><strong>{onlineCount}</strong> Online</span>
          </button>
          <button className={filter === "in_game" ? "social-stat active" : "social-stat"} onClick={() => setFilter("in_game")} type="button">
            <Gamepad2 size={19} /><span><strong>{inGameCount}</strong> In game</span>
          </button>
        </div>

        <div className="panel social-friends-panel">
          <div className="social-panel-heading">
            <div>
              <span className="eyebrow">Your network</span>
              <h2>Friends</h2>
            </div>
            <label className="social-search">
              <Search size={17} />
              <input aria-label="Search friends" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search friends" />
            </label>
          </div>
          <div className="friend-list">
            {visibleFriends.map((friend) => (
              <article className={`friend-row ${friend.presence === "offline" ? "offline" : ""}`} key={friend.id}>
                <div className="social-avatar">
                  {friend.avatarUrl ? <img src={friend.avatarUrl} alt="" /> : friend.initials}
                  <span className={`presence-dot ${friend.presence}`} title={presenceLabel(friend.presence)} />
                </div>
                <div className="friend-identity">
                  <strong data-ui-translation="off">{friend.name}</strong>
                  <span>{friend.rating} Elo{friend.mutualFriends ? ` · ${friend.mutualFriends} mutual` : ""}</span>
                </div>
                <div className={`friend-activity ${friend.presence}`}>
                  {friend.presence === "in_game" && <Gamepad2 size={15} />}
                  {friend.presence === "idle" && <Clock3 size={15} />}
                  <span>{friend.activity}{friend.lastSeen ? ` · ${friend.lastSeen}` : ""}</span>
                </div>
                <div className="friend-actions">
                  <button className="secondary friend-party" type="button" disabled={friend.presence === "offline"} onClick={() => onPartyInvite(friend)}>
                    <Users size={16} /> Party
                  </button>
                  <button className="secondary friend-message" type="button" onClick={() => onMessage(friend)}>
                    <MessageCircle size={16} /> Message
                    {!!friend.unread && <span className="unread-badge">{friend.unread}</span>}
                  </button>
                  <button className="secondary unfriend-button" type="button" aria-label={`Unfriend ${friend.name}`} title={`Unfriend ${friend.name}`} onClick={() => setPendingUnfriend(friend)}>
                    <UserMinus size={16} />
                  </button>
                </div>
              </article>
            ))}
            {visibleFriends.length === 0 && <div className="empty-state social-empty">No friends match this view.</div>}
          </div>
        </div>
      </div>

      <aside className="social-side stack">
        <div className="panel invite-panel">
          <div className="invite-icon"><UserPlus size={22} /></div>
          <div>
            <span className="eyebrow">Grow your party</span>
            <h2>Invite a friend</h2>
          </div>
          <p>Send an invite using their Empire League player name.</p>
          <form onSubmit={submitInvite}>
            <input value={inviteName} onChange={(event) => { setInviteName(event.target.value); setInviteSent(null); setInviteError(null); }} placeholder="Player name" aria-label="Player name" />
            <button className="primary" type="submit" disabled={!inviteName.trim() || invitePending}><Send size={16} /> {invitePending ? "Checking player…" : "Send invite"}</button>
          </form>
          {inviteSent && <span className="invite-confirmation"><Check size={14} /> Invite sent to {inviteSent}</span>}
          {inviteError && <span className="invite-error" role="alert"><X size={14} /> {inviteError}</span>}
        </div>

        <div className="panel requests-panel">
          <div className="social-panel-heading">
            <div><span className="eyebrow">Pending</span><h2>Friend requests</h2></div>
            {requests.length > 0 && <span className="request-count">{requests.length}</span>}
          </div>
          <div className="request-list">
            {requests.map((request) => (
              <article className="request-row" key={request.id}>
                <div className="social-avatar compact">{request.avatarUrl ? <img src={request.avatarUrl} alt="" /> : request.initials}</div>
                <div>
                  <strong data-ui-translation="off">{request.name}</strong>
                  <span>{request.rating} Elo · {request.mutualFriends} mutual</span>
                </div>
                <div className="request-actions">
                  <button type="button" className="accept-request" aria-label={`Accept ${request.name}`} title="Accept" onClick={() => onAccept(request)}><Check size={16} /></button>
                  <button type="button" aria-label={`Decline ${request.name}`} title="Decline" onClick={() => onDecline(request.id)}><X size={16} /></button>
                </div>
              </article>
            ))}
            {requests.length === 0 && <p className="social-empty">You’re all caught up.</p>}
          </div>
        </div>
      </aside>
      {pendingUnfriend && (
        <div className="modal-backdrop social-confirm-backdrop" role="presentation" onPointerDown={() => setPendingUnfriend(null)}>
          <section className="social-confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="unfriend-title" onPointerDown={(event) => event.stopPropagation()}>
            <div className="social-confirm-icon"><UserMinus size={24} /></div>
            <div>
              <span className="eyebrow">Remove friend</span>
              <h2 id="unfriend-title">Unfriend <span data-ui-translation="off">{pendingUnfriend.name}</span>?</h2>
            </div>
            <p>They’ll be removed from your friends list and your current chat history will be cleared.</p>
            <div className="social-confirm-actions">
              <button className="secondary" type="button" onClick={() => setPendingUnfriend(null)}>Cancel</button>
              <button className="social-confirm-remove" type="button" onClick={() => {
                onUnfriend(pendingUnfriend);
                setPendingUnfriend(null);
              }}>
                <UserMinus size={16} /> Unfriend
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export function presenceLabel(presence: FriendPresence) {
  return { online: "Online", in_game: "In game", idle: "Idle", offline: "Offline" }[presence];
}
