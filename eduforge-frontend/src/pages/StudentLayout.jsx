// src/pages/StudentLayout.jsx
import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import AvatarUploader from '../components/AvatarUploader.jsx'
import logo from "../assets/EF.png";
export default function StudentLayout() {
  const nav = useNavigate()
  const userId = localStorage.getItem('userId')
  // pull any saved URL or fall back to null
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem('profileImageUrl')
  )

  const handleAvatarChange = (newUrl) => {
    setAvatarUrl(newUrl)
    localStorage.setItem('profileImageUrl', newUrl)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-600 text-white flex flex-col">
        {/* Header with title + avatar */}
        <div className="pl-1 pr-4 py-4 border-b rounded border-orange-100 flex items-start justify-between">

          {/* LEFT — Logo + Title */}
          <div className="flex items-start gap-0 ">

            {/* Logo — pushed far left */}
            <img
              src={logo}
              alt="EduForge Logo"
              className="h-11 select-none rounded"
              draggable="false"
            />

            {/* Title — slightly lower */}
            <h1 className="text-[25px] font-semibold mt-1 -ml-1">
              EduForge
            </h1>

          </div>

          {/* RIGHT — Avatar */}
          <AvatarUploader
            userId={userId}
            initialUrl={avatarUrl}
            onUpload={handleAvatarChange}
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-green-500"
          />
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-6 py-4 space-y-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 font-light text-white'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="StudentAttendance"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 font-light text-white'
              }`
            }
          >
            Attendance
          </NavLink>

          <NavLink
            to="events"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 font-light text-white'
              }`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="timetable"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 font-light text-white'
              }`
            }
          >
            My Timetable
          </NavLink>
        </nav>


        {/* Logout */}
        <div className="px-6 py-4 border-t border-orange-700">
          <button
            onClick={() => {
              localStorage.clear()
              nav('/')
            }}
            className="w-full bg-white text-orange-600 py-2 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  )
}
