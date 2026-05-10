const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const prisma = require('./prisma')

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value
      const name = profile.displayName
      const avatarUrl = profile.photos?.[0]?.value

      // find existing user or create new one
      let user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        user = await prisma.user.create({
          data: { email, name, avatarUrl, password: null }
        })
      }

      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  }
))

module.exports = passport