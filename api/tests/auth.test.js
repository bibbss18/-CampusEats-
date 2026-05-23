import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'campuseats_secret_key'
const JWT_REFRESH_SECRET = 'campuseats_refresh_secret_key'

describe('Auth Logic', () => {
  it('generează un JWT token valid', () => {
    const payload = { id: 1, username: 'STU1234', role: 'student' }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
    expect(token).toBeTruthy()
  })

  it('verifică un JWT token valid', () => {
    const payload = { id: 1, username: 'STU1234', role: 'student' }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
    const decoded = jwt.verify(token, JWT_SECRET)
    expect(decoded.username).toBe('STU1234')
    expect(decoded.role).toBe('student')
  })

  it('aruncă eroare pentru token invalid', () => {
    expect(() => {
      jwt.verify('token_invalid', JWT_SECRET)
    }).toThrow()
  })

  it('generează refresh token cu durată mai lungă', () => {
    const payload = { id: 1, username: 'STU1234', role: 'student' }
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' })
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
    expect(decoded.username).toBe('STU1234')
  })
})