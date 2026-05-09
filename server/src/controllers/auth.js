const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' })

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) // If email is already registered, return error 409
      return res.status(409).json({ message: 'Email already in use' })

    // Hash the password before saving to the database for security
    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    })

    const token = generateToken(user.id)

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })

  } catch (_err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' })

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = generateToken(user.id)

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })

  } catch (_err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { register, login }