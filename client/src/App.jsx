import { Routes, Route, /**Navigate**/ } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TrainPlanPage from './pages/TrainPlanPage'
import ProgressPage from './pages/ProgressPage'
import CommunitiesPage from './pages/CommunitiesPage.jsx'
import SettingsPage from './pages/SettingsPage'

function ProtectedLayout({ children }) {
  // TODO: restore this when auth is built
  // const token = localStorage.getItem('token')
  // if (!token) return <Navigate to="/login" />
  return <Layout>{children}</Layout>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedLayout><HomePage /></ProtectedLayout>} />
      <Route path="/train" element={<ProtectedLayout><TrainPlanPage /></ProtectedLayout>} />
      <Route path="/progress" element={<ProtectedLayout><ProgressPage /></ProtectedLayout>} />
      <Route path="/communities" element={<ProtectedLayout><CommunitiesPage /></ProtectedLayout>} />
      <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />
    </Routes>
  )
}

export default App