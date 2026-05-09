import '../styles/home.css'

const mockActivities = [
  { id: 1, type: 'Running', duration: 30, date: 'Today, 8:00am', icon: '🏃' },
  { id: 2, type: 'Cycling', duration: 45, date: 'Yesterday, 6:30pm', icon: '🚴' },
  { id: 3, type: 'Gym', duration: 60, date: 'Mon, 7:00am', icon: '🏋️' },
]

const mockLeaderboard = [
  { id: 1, name: 'You', points: 340, initials: 'YO' },
  { id: 2, name: 'Maria S.', points: 290, initials: 'MS' },
  { id: 3, name: 'João P.', points: 210, initials: 'JP' },
  { id: 4, name: 'Ana R.', points: 180, initials: 'AR' },
]

function HomePage() {

  return (
    <>
      <div className="home-header">
        <h2>Good morning 👋</h2>
        <p>Here's your fitness snapshot for today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">This week</p>
          <p className="stat-value">3</p>
          <p className="stat-sub">activities logged</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Minutes active</p>
          <p className="stat-value">135</p>
          <p className="stat-sub">Goal: 150 min</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Community rank</p>
          <p className="stat-value">#1</p>
          <p className="stat-sub">Out of 12 members</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Streak</p>
          <p className="stat-value">5 🔥</p>
          <p className="stat-sub">days in a row</p>
        </div>
      </div>

      <div className="home-grid">
        <div className="card">
          <div className="card-header">Recent activity</div>
          {mockActivities.map(a => (
            <div key={a.id} className="activity-item">
              <div className="activity-icon">{a.icon}</div>
              <div className="activity-info">
                <p className="activity-name">{a.type}</p>
                <p className="activity-meta">{a.date}</p>
              </div>
              <span className="activity-duration">{a.duration} min</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">Community leaderboard</div>
          {mockLeaderboard.map((u, i) => (
            <div key={u.id} className="leaderboard-item">
              <span className={`leaderboard-rank ${i < 3 ? 'top' : ''}`}>#{i + 1}</span>
              <div className="leaderboard-avatar">{u.initials}</div>
              <span className="leaderboard-name">{u.name}</span>
              <span className="leaderboard-points">{u.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage