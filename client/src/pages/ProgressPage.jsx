import '../styles/progress.css'

const weeklyData = [
  { week: 'W1', minutes: 90 },
  { week: 'W2', minutes: 120 },
  { week: 'W3', minutes: 75 },
  { week: 'W4', minutes: 150 },
  { week: 'W5', minutes: 135 },
  { week: 'W6', minutes: 180 },
]

const breakdown = [
  { type: 'Running', icon: '🏃', minutes: 210, pct: 42 },
  { type: 'Gym', icon: '🏋️', minutes: 180, pct: 36 },
  { type: 'Cycling', icon: '🚴', minutes: 110, pct: 22 },
]

const personalBests = [
  { label: 'Longest run', value: '12 km', icon: '🏃' },
  { label: 'Best streak', value: '9 days', icon: '🔥' },
  { label: 'Most active week', value: '180 min', icon: '📈' },
  { label: 'Total workouts', value: '42', icon: '🏅' },
]

const maxMinutes = Math.max(...weeklyData.map(d => d.minutes))

function ProgressPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Progress</h2>
          <p className="page-subtitle">Track your fitness journey over time.</p>
        </div>
      </div>

      <div className="progress-stats">
        <div className="stat-card">
          <p className="stat-label">This month</p>
          <p className="stat-value">750</p>
          <p className="stat-sub">minutes active</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Workouts</p>
          <p className="stat-value">18</p>
          <p className="stat-sub">this month</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Avg / week</p>
          <p className="stat-value">125</p>
          <p className="stat-sub">minutes</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Current streak</p>
          <p className="stat-value">5 🔥</p>
          <p className="stat-sub">days</p>
        </div>
      </div>

      <div className="chart-card">
        <h3>Weekly activity (minutes)</h3>
        <div className="bar-chart">
          {weeklyData.map((d, i) => (
            <div key={d.week} className="bar-wrap">
              <span className="bar-value">{d.minutes}</span>
              <div
                className={`bar ${i === weeklyData.length - 1 ? 'current' : ''}`}
                style={{ height: `${(d.minutes / maxMinutes) * 80}px` }}
              />
              <span className="bar-label">{d.week}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <h3>Activity breakdown</h3>
        <div className="activity-breakdown">
          {breakdown.map(b => (
            <div key={b.type} className="breakdown-item">
              <span className="breakdown-label">{b.icon} {b.type}</span>
              <div className="breakdown-bar-wrap">
                <div className="breakdown-bar" style={{ width: `${b.pct}%` }} />
              </div>
              <span className="breakdown-value">{b.minutes} min</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 15, fontWeight: 600, marginBottom: '0.75rem' }}>Personal bests</p>
      <div className="personal-bests">
        {personalBests.map(pb => (
          <div key={pb.label} className="pb-card">
            <div className="pb-icon">{pb.icon}</div>
            <p className="pb-label">{pb.label}</p>
            <p className="pb-value">{pb.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProgressPage