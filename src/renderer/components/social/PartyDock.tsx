import { Crown, LogOut, MessageCircle, Minus, Send, Shield, UserMinus, Users, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { PartySnapshot } from "../../../shared/contracts/parties";

export function PartyDock({ snapshot, currentPlayerId, onAccept, onDecline, onLeave, onRemove, onSend }: {
  snapshot: PartySnapshot;
  currentPlayerId: string;
  onAccept: (inviteId: string) => void;
  onDecline: (inviteId: string) => void;
  onLeave: () => void;
  onRemove: (playerId: string) => void;
  onSend: (text: string) => void;
}) {
  const [minimized, setMinimized] = useState(false);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const party = snapshot.party;
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [party?.messages]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  }

  return <>
    {!party && snapshot.invites.length > 0 && <div className="party-invite-stack">{snapshot.invites.map((invite) => (
      <section className="party-invite-toast" key={invite.id}>
        <Shield size={22} />
        <div><strong data-ui-translation="off">{invite.inviterName}</strong><span>invited you to a party</span></div>
        <button className="primary" type="button" onClick={() => onAccept(invite.id)}>Join</button>
        <button className="party-invite-decline" type="button" aria-label="Decline party invite" title="Decline" onClick={() => onDecline(invite.id)}><X size={15} /></button>
      </section>
    ))}</div>}
    {party && (minimized
      ? <button className="party-minimized" type="button" onClick={() => setMinimized(false)}>
          <Users size={18} /><span><strong>Party</strong><small>{party.members.length}/4 · {party.activeQueue ? "Searching" : "Ready"}</small></span>
        </button>
      : <section className="chat-window party-window">
          <header className="chat-header party-header">
            <button className="chat-person" type="button" onClick={() => setMinimized(true)}>
              <span className="party-mark"><Users size={18} /></span>
              <span><strong>Party</strong><small>{party.activeQueue ? `Finding ${party.activeQueue.queue.name}` : `${party.members.length}/4 members`}</small></span>
            </button>
            <div><button type="button" aria-label="Minimize party chat" onClick={() => setMinimized(true)}><Minus size={16} /></button></div>
          </header>
          <div className="party-members">
            {party.members.map((member) => <div key={member.id}>
              <span className="social-avatar compact">{member.avatarUrl ? <img src={member.avatarUrl} alt="" /> : initialsFor(member.displayName)}</span>
              <span><strong data-ui-translation="off">{member.displayName}</strong><small>{member.teamRating} team Elo</small></span>
              {member.id === party.leaderId && <Crown size={14} aria-label="Party leader" />}
              {party.isLeader && member.id !== currentPlayerId && !party.activeQueue && <button type="button" aria-label={`Remove ${member.displayName}`} onClick={() => onRemove(member.id)}><UserMinus size={14} /></button>}
            </div>)}
            {!party.activeQueue && <button className="party-leave" type="button" onClick={onLeave}><LogOut size={13} /> {party.isLeader ? "Disband party" : "Leave party"}</button>}
          </div>
          <div className="chat-messages party-messages">
            {party.messages.length === 0 && <p className="party-empty"><MessageCircle size={16} /> Party chat stays here while you are together.</p>}
            {party.messages.map((message) => message.system
              ? <div className="party-system-message" key={message.id}>{message.text}</div>
              : <div className={`chat-message ${message.playerId === currentPlayerId ? "me" : "friend"}`} key={message.id}>
                  {message.playerId !== currentPlayerId && <small data-ui-translation="off">{message.author}</small>}
                  <span data-ui-translation="off">{message.text}</span>
                </div>)}
            <div ref={endRef} />
          </div>
          <form className="chat-compose" onSubmit={submit}>
            <input value={draft} maxLength={1000} onChange={(event) => setDraft(event.target.value)} placeholder="Message party" aria-label="Message party" />
            <button type="submit" aria-label="Send party message" disabled={!draft.trim()}><Send size={17} /></button>
          </form>
        </section>)}
  </>;
}

function initialsFor(name: string) {
  return name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
