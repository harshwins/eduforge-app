// src/pages/StudentDashboard.jsx
import React from 'react'

export default function StudentDashboard() {
  const studentName = localStorage.getItem('userName') || 'Student'

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {studentName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Your Timetable</h3>
          <p>(Your timetable component goes here)</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Attendance Summary</h3>
          <p>(Your attendance chart goes here)</p>
        </div>
      </div>
    </div>
  )
}
