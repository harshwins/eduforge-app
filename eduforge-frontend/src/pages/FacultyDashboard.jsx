// src/pages/FacultyDashboard.jsx
import React from 'react'

export default function FacultyDashboard() {
  const facultyName = localStorage.getItem('userName') || 'Faculty'

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {facultyName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Your Schedule</h3>
          <p>(Schedule table goes here)</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Pending Registrations</h3>
          <p>(Your pending registrations go here)</p>
        </div>
      </div>
    </div>
  )
}
