const router = require('express').Router()
const passport = require('../lib/passport')
const { register, login, googleCallback } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleCallback
)

module.exports = router