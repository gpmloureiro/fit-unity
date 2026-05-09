import { useState } from 'react'
import '../styles/communities.css'

const mockCommunities = [
  { id: 1, name: 'Morning Runners', members: 12, points: 340 },
  { id: 2, name: 'Gym Squad', members: 8, points: 210 },
  { id: 3, name: 'Cycling Club', members: 5, points: 180 },
]

const mockLeaderboard = [
  { name: 'You', initials: 'YO', points: 340 },
  { name: 'Maria S.', initials: 'MS', points: 290 },
  { name: 'João P.', initials: 'JP', points: 210 },
]

const initialMessages = [
  { id: 1, sender: 'Maria S.', initials: 'MS', text: 'Great run this morning! 🏃', time: '08:12', own: false },
  { id: 2, sender: 'You', initials: 'YO', text: 'Same! Hit a new PB 💪', time: '08:15', own: true },
  { id: 3, sender: 'João P.', initials: 'JP', text: 'Nice one! I missed today, catching up tomorrow', time: '08:20', own: false },
]

function CommunitiesPage() {
  const [selected, setSelected] = useState(mockCommunities[0])
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'You',
      initials: 'YO',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      own: true,
    }])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h2 className="page-title">Communities</h2>
          <p className="page-subtitle">Connect and compete with your groups.</p>
        </div>
        <button className="btn btn-accent">+ Join community</button>
      </div>

      <div className="communities-layout">
        <div className="communities-list">
          <div className="communities-list-header">
            <span>Your groups</span>
          </div>
          {mockCommunities.map(c => (
            <div
              key={c.id}
              className={`community-item ${selected?.id === c.id ? 'active' : ''}`}
              onClick={() => setSelected(c)}
            >
              <p className="community-item-name">{c.name}</p>
              <p className="community-item-meta">{c.members} members · {c.points} pts</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div className="chat-panel">
            <div className="chat-header">
              <div>
                <p className="chat-header-title">{selected.name}</p>
                <p className="chat-header-sub">{selected.members} members</p>
              </div>
            </div>

            <div className="leaderboard-strip">
              {mockLeaderboard.map((u, i) => (
                <div key={u.name} className="leaderboard-pill">
                  <span className="rank">#{i + 1}</span>
                  <span>{u.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{u.points} pts</span>
                </div>
              ))}
            </div>

            <div className="chat-messages">
              {messages.map(m => (
                <div key={m.id} className={`message ${m.own ? 'own' : ''}`}>
                  <div className="message-avatar">{m.initials}</div>
                  <div className="message-bubble">
                    <p className="message-sender">{m.sender}</p>
                    <p className="message-text">{m.text}</p>
                    <p className="message-time">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-bar">
              <input
                className="chat-input"
                placeholder="Send a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className="btn-send" onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="chat-panel">
            <div className="no-community">Select a community to start chatting</div>
          </div>
        )}
      </div>
    </>
  )
}

export default CommunitiesPage