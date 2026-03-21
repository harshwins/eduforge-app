// src/pages/Login.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"
import toast from "react-hot-toast"
import { FiEye, FiEyeOff } from "react-icons/fi"
import logo from "../assets/EF 8K.png"
import sideImage from "../assets/login.webp"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await API.post(`/api/auth/login`, { email, password })
      const { userId, role, name } = res.data

      localStorage.setItem("userId", userId)
      localStorage.setItem("role", role.toLowerCase())
      localStorage.setItem("adminName", name)

      const roleLower = role.toLowerCase()

      toast.success(`Welcome ${name}`)

      setTimeout(() => {
        if (roleLower === "student") nav("/student")
        else if (roleLower === "faculty") nav("/faculty")
        else if (roleLower === "admin") nav("/admin")
      }, 800)
    } catch (err) {
      console.error(err)
      toast.error("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      {/* ATTACHED PANEL */}
      <div className="flex rounded shadow-xl overflow-hidden">

        {/* LEFT — LOGIN CARD */}
        <div className="bg-white p-12 px-8 w-full max-w-[400px] border-r border-gray-200">

          {/* HEADER */}
          <div className="flex items-center mb-1">
            <img
              src={logo}
              alt="EduForge Logo"
              className="h-20 w-auto select-none"
              draggable="false"
            />
            <h2 className="text-[27px] font-medium text-gray-900">
              EduForge
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Username or E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm w-full px-3 py-2 rounded
                  border border-gray-300 bg-white
                  text-gray-900 placeholder-gray-400
                  shadow-sm font-light
                  hover:border-orange-600
                  focus:outline-none
                  focus:border-orange-500
                  focus:ring-1 focus:ring-orange-500/35"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6 relative">
              <input
                type={showPass ? "text" : "password"}
                disabled={loading}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-sm w-full px-3 py-2 pr-11 rounded
                  border border-gray-300 bg-white
                  text-gray-900 placeholder-gray-400
                  shadow-sm font-light
                  hover:border-orange-600
                  focus:outline-none
                  focus:border-orange-600
                  focus:ring-1 focus:ring-orange-500/35"
              />

              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
              >
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-sm font-light flex items-center justify-center
                ${loading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-orange-500 text-white hover:bg-orange-400"
                }`}
            >
              {loading ? "Authenticating…" : "Sign In"}
            </button>
            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={() => nav("/forgot-password")}
                className="text-sm font-light text-orange-500 hover:text-orange-400 font-light transition-all duration-400 ease-out"
              >
                Forgot password?
              </button>
            </div>

            {/* REGISTER */}
            <div className="mt-5 text-center">
              <span className="text-sm text-gray-600 font-light">
                Don’t have an account?{" "}
              </span>
              <button
                type="button"
                onClick={() => nav("/register")}
                className="text-orange-500 hover:text-orange-400 text-sm font-light"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-xs text-gray-600 text-center">
            © 2026 EduForge. All rights reserved.
          </p>
        </div>

        {/* RIGHT — IMAGE (ATTACHED) */}
        <div className="bg-white ">
          <img
            src={sideImage}
            alt="Login Illustration"
            className="h-[455px]  object-cover w-[750px]"
          />
        </div>

      </div>

    </div>
  )
}