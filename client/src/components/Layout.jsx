import { NavLink } from 'react-router-dom'
import '../styles/layout.css'

const navItems = [
  { to: '/',            icon: '🏠', label: 'Home' },
  { to: '/train',       icon: '🏋️', label: 'Train Plan' },
  { to: '/progress',    icon: '📈', label: 'Progress' },
  { to: '/communities', icon: '👥', label: 'Communities' },
]

function Layout({ children }) {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">Fit Unity</div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <NavLink
            to="/settings"
            className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
          >
            <span className="nav-icon">⚙️</span>
            Settings
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => 'bottom-nav-item' + (isActive ? ' active' : '')}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <NavLink
          to="/settings"
          className={({ isActive }) => 'bottom-nav-item' + (isActive ? ' active' : '')}
        >
          <span>⚙️</span>
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Layout