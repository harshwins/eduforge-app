// src/pages/Attendance.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Attendance() {
  const studentId = localStorage.getItem('userId')
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    if (!studentId) {
      setError('No student ID found; please log in.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    axios
      .get(`http://localhost:8080/api/students/${studentId}/attendance`)
      .then(({ data }) => {
        if (Array.isArray(data.attendance)) {
          setAttendance(data.attendance)
        } else {
          setAttendance([])
        }
      })
      .catch(err => {
        console.error(err)
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          `Failed to load attendance (status ${err.response?.status})`
        setError(msg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [studentId])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading attendance…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Attendance</h2>

      {attendance.length === 0 ? (
        <p className="text-gray-500">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left">
            <caption className="sr-only">Attendance summary</caption>
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">Semester</th>
                <th className="py-2 px-4">Attended</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">%</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((row) => {
                const key = `${row.subject}-${row.semester}`
                return (
                  <tr key={key} className="border-t">
                    <td className="py-2 px-4">{row.subject}</td>
                    <td className="py-2 px-4">{row.semester}</td>
                    <td className="py-2 px-4">{row.attended}</td>
                    <td className="py-2 px-4">{row.total}</td>
                    <td className="py-2 px-4">
                      {typeof row.percent === 'number'
                        ? row.percent.toFixed(2)
                        : row.percent}
                      %
                    </td>
                    <td className="py-2 px-4">{row.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
