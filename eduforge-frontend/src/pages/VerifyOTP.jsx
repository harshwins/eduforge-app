
// src/pages/VerifyOTP.jsx
import React, { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import API from "../api"
import toast from "react-hot-toast"
import { FiMail } from "react-icons/fi"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(30)
  const inputsRef = useRef([])
  const nav = useNavigate()
  const { state } = useLocation()
  const email = state?.email

  // ⏱️ Countdown
  useEffect(() => {
    if (timer === 0) return
    const id = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [timer])

  const handleChange = (value, i) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[i] = value
    setOtp(newOtp)

    if (value && i < 5) inputsRef.current[i + 1].focus()
  }

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1].focus()
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const code = otp.join("")

    if (code.length !== 6) {
      toast.error("Enter complete OTP")
      return
    }

    try {
      await API.post("/api/auth/verify-otp", {
        email,
        otp: code
      })

      toast.success("Account verified successfully!")
      nav("/")

    } catch {
      toast.error("Invalid or expired OTP")
    }
  }

  const handleResend = async () => {
    try {
      await API.post("/api/auth/register", { email })
      toast.success("OTP resent 📩")
      setTimer(30)
    } catch {
      toast.error("Failed to resend OTP")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="bg-white p-10 rounded shadow-xl w-full max-w-md">

        {/* 📧 EMAIL ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <FiMail size={28} className="text-orange-500" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-1">
          Check your email
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          We sent a 6-digit code to <br />
          <span className="font-medium text-gray-700">
            {email || "your email"}
          </span>
        </p>

        <form onSubmit={handleVerify}>

          {/* 🔢 OTP BOXES */}
          <div className="flex justify-between mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center text-lg rounded
                  border border-gray-300 bg-white
                  text-gray-900 shadow-sm font-medium
                  hover:border-orange-600
                  focus:outline-none
                  focus:border-orange-500
                  focus:ring-2 focus:ring-orange-500/40
                  transition-all duration-300 ease-out"
              />
            ))}
          </div>

          {/* ✅ VERIFY BUTTON */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded
              hover:bg-orange-400
              transition-all duration-300 ease-out"
          >
            Verify OTP
          </button>

        </form>

        {/* 🔁 RESEND */}
        <div className="mt-5 text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-400">
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-orange-500 hover:text-orange-400
                font-medium transition-all duration-300"
            >
              Resend OTP
            </button>
          )}
        </div>

      </div>

    </div>
  )
}