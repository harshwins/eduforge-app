// src/pages/StudentTimetable.jsx
import React, { useState, useEffect } from 'react'
import API from '../api'

export default function StudentTimetable() {
  const studentId = Number(localStorage.getItem('userId'))
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    API
      .get(`/api/students/${studentId}/timetable`)
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
  if (error) return <p className="p-6 text-red-600">{error}</p>

  // ---------- CONFIG ----------

  const days = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ]

  // Unique time slots
  const timeSlots = [
    ...new Set(
      slots.map(s => `${s.startTime}-${s.endTime}`)
    )
  ].sort()

  // Find lecture for a cell
  const getLecture = (day, time) =>
    slots.find(
      s =>
        s.dayOfWeek === day &&
        `${s.startTime}-${s.endTime}` === time
    )

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Timetable</h2>

      {slots.length === 0 ? (
        <p className="text-gray-500">No lectures scheduled.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">

          <table className="min-w-full border border-gray-300">

            {/* Header */}
            <thead>
              <tr>
                <th className="border p-2 text-left">Time</th>
                {days.map(day => (
                  <th key={day} className="border p-2 text-center">
                    {day.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>

                  {/* Time column */}
                  <td className="border p-2 font-medium whitespace-nowrap">
                    {time.slice(0, 5)} – {time.slice(6, 11)}
                  </td>

                  {/* Day columns */}
                  {days.map(day => {
                    const lec = getLecture(day, time)

                    return (
                      <td
                        key={day}
                        className="border p-2 text-center align-top h-20"
                      >
                        {lec ? (
                          <div className="leading-tight">
                            <div className="font-semibold">
                              {lec.subject}
                            </div>
                            <div className="text-sm text-gray-600">
                              {lec.location}
                            </div>
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  )
}