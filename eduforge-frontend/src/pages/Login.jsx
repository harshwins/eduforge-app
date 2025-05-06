// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)
  const nav = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // this goes to /api/login via your Vite proxy → Spring Boot at 8080
      const res = await axios.post('/api/login', { email, password })
      const { userId, role, name } = res.data

      // persist and redirect by role
      localStorage.setItem('userId', userId)
      localStorage.setItem('role', role.toLowerCase())
      localStorage.setItem('adminName', name)

      if (role.toLowerCase() === 'student')   nav('/student')
      else if (role.toLowerCase() === 'faculty') nav('/faculty')
      else if (role.toLowerCase() === 'admin')   nav('/admin')
      else {
        setError(`Unknown role "${role}"`)
      }
    } catch (err) {
      console.error(err)
      setError(
        err.response?.status === 401
          ? 'Invalid credentials.'
          : 'Server error — please try again later.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          EduForge Login
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-orange-400"
            placeholder="you@domain.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <div className="relative mb-6">
            <input
              id="password"
              type={showPass ? 'text' : 'password'}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded 
              ${loading
                ? 'bg-gray-400 text-gray-200'
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}
              transition`}
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
