
// src/pages/Register.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"
import toast from "react-hot-toast"
import logo from "../assets/EF 8K.png"
import sideImage from "../assets/register.jpeg"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password
      })

      toast.success("OTP sent to your email 📩")
      nav("/verifyOTP", { state: { email } })

    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.error || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="flex rounded shadow-xl overflow-hidden">

        {/* LEFT — REGISTER CARD */}
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

            {/* NAME */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-sm w-full px-3 py-2 rounded
                  border border-gray-300 bg-white
                  text-gray-900 placeholder-gray-400
                  shadow-sm font-light
                  hover:border-orange-600
                  focus:outline-none
                  focus:border-orange-500
                  focus:ring-1 focus:ring-orange-500/35
                  transition-all duration-300 ease-out"
              />
            </div>

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
                  focus:ring-1 focus:ring-orange-500/35
                  transition-all duration-300 ease-out"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-sm w-full px-3 py-2 rounded
                  border border-gray-300 bg-white
                  text-gray-900 placeholder-gray-400
                  shadow-sm font-light
                  hover:border-orange-600
                  focus:outline-none
                  focus:border-orange-500
                  focus:ring-1 focus:ring-orange-500/35
                  transition-all duration-300 ease-out"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-sm w-full px-3 py-2 rounded
                  border border-gray-300 bg-white
                  text-gray-900 placeholder-gray-400
                  shadow-sm font-light
                  hover:border-orange-600
                  focus:outline-none
                  focus:border-orange-500
                  focus:ring-1 focus:ring-orange-500/35
                  transition-all duration-300 ease-out"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-sm font-light flex items-center justify-center
                transition-all duration-300 ease-out
                ${loading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-orange-500 text-white hover:bg-orange-400"
                }`}
            >
              {loading ? "Creating account…" : "Register"}
            </button>

            {/* BACK TO LOGIN */}
            <div className="mt-5 text-center">
              <span className="text-sm text-gray-600 font-light">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                onClick={() => nav("/")}
                className="text-orange-500 hover:text-orange-400 text-sm font-light
                  transition-all duration-300 ease-out"
              >
                Sign In
              </button>
            </div>

          </form>

          <p className="mt-6 text-xs text-gray-600 text-center">
            © 2026 EduForge. All rights reserved.
          </p>

        </div>

        {/* RIGHT — IMAGE */}
        <div className="bg-white">
          <img
            src={sideImage}
            alt="Register Illustration"
            className="h-[540px] object-cover w-[600px]"
          />
        </div>

      </div>

    </div>
  )
}
