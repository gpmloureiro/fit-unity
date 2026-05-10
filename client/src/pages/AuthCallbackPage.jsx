import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthCallbackPage() {
  const navigate = useNavigate()
  const handled = useRef(false)

  useEffect(() => {
    if (handled.current) return
    handled.current = true

    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('token', token)
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [navigate])

  return <p style={{ padding: '2rem' }}>Signing you in...</p>
}

export default AuthCallbackPage