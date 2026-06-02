import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

export async function register(req, res, next) {
  try {
    const { email, password, role } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

    const user  = await User.create({ email, password, role: role === 'admin' ? 'admin' : 'user' })
    const token = signToken(user._id, user.email, user.role)
    res.status(201).json({ token, user })
  } catch (e) { next(e) }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = signToken(user._id, user.email, user.role)
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } })
  } catch (e) { next(e) }
}

export async function getMe(req, res) {
  res.json({ user: req.user })
}
