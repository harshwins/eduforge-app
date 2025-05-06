// src/pages/StudentAttendance.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function StudentAttendance() {
  const studentId = Number(localStorage.getItem('userId'))
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/students/${studentId}/attendance`)
      .then(r => setRows(r.data.attendance))
      .catch(console.error)
  }, [studentId])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Subject</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Attended</th>
              <th className="p-3">Total</th>
              <th className="p-3">Percent</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={`${r.subject}-${r.semester}`} className="border-t">
                <td className="p-3">{r.subject}</td>
                <td className="p-3">{r.semester}</td>
                <td className="p-3">{r.attended}</td>
                <td className="p-3">{r.total}</td>
                <td className="p-3">{r.percent}%</td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
