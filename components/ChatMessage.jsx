'use client'

export default function ChatMessage({ currentUser, chatMessage }) {
    const { user, message, date, room } = Object(chatMessage);

    return <div className={`chat-tile message ${user === currentUser ? 'self' : ''}`}>
        <span className="username">{user} ({room || 'Public'})</span>
        <p>{message}</p>
        <span className="date">{new Date(date).toLocaleString()}</span>
    </div>
}
