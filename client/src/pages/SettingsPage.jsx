import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/useTheme'
import '../styles/settings.css'

function Toggle({ value, onChange }) {
  return (
    <button className={`toggle ${value ? 'on' : ''}`} onClick={() => onChange(!value)}>
      <div className="toggle-knob" />
    </button>
  )
}

function SettingsPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState('Your Name')
  const [email, setEmail] = useState('you@example.com')
  const [notifications, setNotifications] = useState({
    email: true,
    milestones: true,
    weekly: false,
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Settings</h2>
          <p className="page-subtitle">Manage your account and preferences.</p>
        </div>
      </div>

      <div className="settings-layout">

        <div className="settings-section">
          <p className="settings-section-title">Profile</p>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Avatar</p>
              <p className="settings-row-sub">Your profile picture</p>
            </div>
            <div className="avatar-row">
              <div className="settings-avatar">YO</div>
              <button className="btn btn-outline" style={{ fontSize: 13, padding: '7px 14px' }}>Change</button>
            </div>
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Display name</p>
            </div>
            <input
              className="settings-input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Email</p>
            </div>
            <input
              className="settings-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Password</p>
              <p className="settings-row-sub">Change your password</p>
            </div>
            <button className="btn btn-outline" style={{ fontSize: 13, padding: '7px 14px' }}>Update</button>
          </div>
        </div>

        <div className="settings-section">
          <p className="settings-section-title">Appearance</p>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Theme</p>
              <p className="settings-row-sub">Choose your preferred display mode</p>
            </div>
            <div className="mode-options">
              <button
                className={`mode-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                ☀️ Light
              </button>
              <button
                className={`mode-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                🌙 Dark
              </button>
              <button
                className={`mode-btn ${theme === 'system' ? 'active' : ''}`}
                onClick={() => setTheme('system')}
              >
                💻 System
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <p className="settings-section-title">Notifications</p>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Email notifications</p>
              <p className="settings-row-sub">Receive activity updates by email</p>
            </div>
            <Toggle
              value={notifications.email}
              onChange={v => setNotifications(n => ({ ...n, email: v }))}
            />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Milestone alerts</p>
              <p className="settings-row-sub">When friends hit a goal</p>
            </div>
            <Toggle
              value={notifications.milestones}
              onChange={v => setNotifications(n => ({ ...n, milestones: v }))}
            />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Weekly summary</p>
              <p className="settings-row-sub">Every Sunday morning</p>
            </div>
            <Toggle
              value={notifications.weekly}
              onChange={v => setNotifications(n => ({ ...n, weekly: v }))}
            />
          </div>
        </div>

        <div className="settings-section">
          <p className="settings-section-title">Fitness goals</p>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Weekly target</p>
              <p className="settings-row-sub">Minutes of activity per week</p>
            </div>
            <input className="settings-input" type="number" defaultValue={150} />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Primary sport</p>
            </div>
            <select className="settings-input">
              <option>Running</option>
              <option>Gym</option>
              <option>Cycling</option>
              <option>Swimming</option>
              <option>Mixed</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <p className="settings-section-title">Account</p>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Sign out</p>
              <p className="settings-row-sub">Log out of your account</p>
            </div>
            <button
              className="btn btn-outline"
              style={{ fontSize: 13, padding: '7px 14px' }}
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-label">Delete account</p>
              <p className="settings-row-sub">Permanently remove your data</p>
            </div>
            <button className="btn-danger">Delete</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default SettingsPage