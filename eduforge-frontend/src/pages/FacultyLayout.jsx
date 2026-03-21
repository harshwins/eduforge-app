// src/pages/FacultyLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import AvatarUploader from '../components/AvatarUploader.jsx';
import logo from "../assets/EF.png"
export default function FacultyLayout() {
  const nav = useNavigate();
  const userId = localStorage.getItem('userId');
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem('profileImageUrl')
  );

  const handleAvatarChange = (newUrl) => {
    setAvatarUrl(newUrl);
    localStorage.setItem('profileImageUrl', newUrl);
  };

  return (
    <div className="flex rounded min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-600 rounded text-white flex flex-col">
        {/* Header with title + avatar */}
        <div className="pl-1 pr-4 py-4 border-b rounded border-orange-100 flex items-start justify-between">

          {/* LEFT — Logo + Title */}
          <div className="flex items-start gap-0">

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
        <nav className="flex-1 px-4 py-4 rounded space-y-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `block px-4 py-2 font-light rounded transition-all duration-400 ease-out ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Overview
          </NavLink>

          <NavLink
            to="pending"
            className={({ isActive }) =>
              `block px-4 py-2 font-light rounded transition-all duration-400 ease-out ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Registrations
          </NavLink>

          {/* Take Attendance */}
          <NavLink
            to="take-attendance"
            className={({ isActive }) =>
              `block px-4 py-2 font-light rounded transition-all duration-400 ease-out ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Take Attendance
          </NavLink>

          <NavLink
            to="timetable"
            className={({ isActive }) =>
              `block px-4 py-2 font-light rounded transition-all duration-400 ease-out ${isActive
                ? 'bg-white text-orange-600'
                : 'hover:bg-orange-700 text-white'
              }`
            }
          >
            Manage Timetable
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="px-6 py-4 border-t border-white rounded mt-auto ">
          <button
            onClick={() => {
              localStorage.clear();
              nav('/');
            }}
            className="w-full bg-white text-orange-600 py-2 font-light rounded hover:bg-gray-200 transition-all duration-400 ease-out"
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
  );
}
