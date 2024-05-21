'use client'

export default function ChatMessage({ currentUser, chatMessage }) {
    const { user, message, createdAt, group } = Object(chatMessage);

    return <div className={`chat-tile message ${user === currentUser ? 'self' : ''}`}>
        <span className="username">{user} ({group?.name || 'Public'})</span>
        <p>{message}</p>
        <span className="date">{new Date(createdAt).toLocaleString()}</span>
    </div>
}
