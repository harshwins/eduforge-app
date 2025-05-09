// src/pages/StudentLayout.jsx
import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import AvatarUploader from '../components/AvatarUploader.jsx'

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
        <div className="px-6 py-4 border-b border-orange-700 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edu Forge</h1>
          <AvatarUploader
            userId={userId}
            initialUrl={avatarUrl}
            onUpload={handleAvatarChange}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white"
          />
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-6 py-4 space-y-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? 'bg-white text-orange-600'
                  : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="attendance"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? 'bg-white text-orange-600'
                  : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Attendance
          </NavLink>

          <NavLink
            to="events"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? 'bg-white text-orange-600'
                  : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="timetable"
            className={({isActive})=>
              `block px-4 py-2 rounded ${
                isActive
                  ? 'bg-white text-orange-600'
                  : 'hover:bg-orange-700 text-white'
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
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-100 transition"
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
