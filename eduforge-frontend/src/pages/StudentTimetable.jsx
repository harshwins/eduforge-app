// src/pages/StudentTimetable.jsx
import React, { useState, useEffect } from 'react'
import API from '../api';

export default function StudentTimetable() {
  const studentId = Number(localStorage.getItem('userId'))
  const [slots, setSlots]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    API
      .get(`http://localhost:8080/api/students/${studentId}/timetable`)
      .then(({ data }) => {
        setSlots(data)
        setError(null)
      })
      .catch(() => {
        setError('Failed to load timetable.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [studentId])

  if (loading) return <p className="p-6 text-gray-600">Loading timetable…</p>
  if (error)   return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Timetable</h2>

      {slots.length === 0 ? (
        <p className="text-gray-500">No lectures scheduled.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">Day</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Location</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((l, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{l.subject}</td>
                  <td className="py-2 px-4">{l.dayOfWeek}</td>
                  <td className="py-2 px-4">
                    {l.startTime.slice(0,5)}–{l.endTime.slice(0,5)}
                  </td>
                  <td className="py-2 px-4">{l.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
