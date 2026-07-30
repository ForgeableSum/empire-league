import { MessageCircle, Minus, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SocialFriend } from "../../pages/SocialPage";
import { presenceLabel } from "../../pages/SocialPage";

export interface OpenChat {
  friend: SocialFriend;
  minimized: boolean;
  messages: Array<{ id: string; from: "me" | "friend"; text: string; time: string }>;
}

export function ChatDock({
  chats,
  onToggle,
  onClose,
  onSend
}: {
  chats: OpenChat[];
  onToggle: (id: string) => void;
  onClose: (id: string) => void;
  onSend: (id: string, text: string) => void;
}) {
  return (
    <div className="chat-dock" aria-label="Open conversations">
      {chats.map((chat) => chat.minimized
        ? <button className="chat-minimized" type="button" key={chat.friend.id} onClick={() => onToggle(chat.friend.id)}>
            <MessageCircle size={17} /><span>{chat.friend.name}</span><span className={`presence-dot ${chat.friend.presence}`} />
          </button>
        : <ChatWindow key={chat.friend.id} chat={chat} onToggle={onToggle} onClose={onClose} onSend={onSend} />)}
    </div>
  );
}

function ChatWindow({ chat, onToggle, onClose, onSend }: {
  chat: OpenChat;
  onToggle: (id: string) => void;
  onClose: (id: string) => void;
  onSend: (id: string, text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [chat.messages]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    onSend(chat.friend.id, draft.trim());
    setDraft("");
  }

  return (
    <section className="chat-window">
      <header className="chat-header">
        <button className="chat-person" type="button" onClick={() => onToggle(chat.friend.id)}>
          <span className="social-avatar compact">{chat.friend.initials}<span className={`presence-dot ${chat.friend.presence}`} /></span>
          <span><strong>{chat.friend.name}</strong><small>{presenceLabel(chat.friend.presence)}</small></span>
        </button>
        <div>
          <button type="button" aria-label="Minimize chat" onClick={() => onToggle(chat.friend.id)}><Minus size={16} /></button>
          <button type="button" aria-label="Close chat" onClick={() => onClose(chat.friend.id)}><X size={16} /></button>
        </div>
      </header>
      <div className="chat-messages">
        <div className="chat-day">Today</div>
        {chat.messages.map((message) => (
          <div className={`chat-message ${message.from}`} key={message.id}>
            <span>{message.text}</span><small>{message.time}</small>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="chat-compose" onSubmit={submit}>
        <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Message ${chat.friend.name}`} aria-label={`Message ${chat.friend.name}`} />
        <button type="submit" aria-label="Send message" disabled={!draft.trim()}><Send size={17} /></button>
      </form>
    </section>
  );
}
