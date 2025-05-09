// src/pages/ManageTimetable.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api';

export default function ManageTimetable() {
  const facultyId = Number(localStorage.getItem('userId'))
  const [slots, setSlots]     = useState([])
  const [form, setForm]       = useState({
    dayOfWeek: 'Monday',
    slot: 1,
    startTime: '09:00',
    endTime: '10:00',
    subject: '',
    location: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = () => {
    setLoading(true)
    setError(null)
    API.post('/faculty/timetable', { params: { facultyId } })
      .then(res => setSlots(res.data))
      .catch(() => setError('Failed to load timetable.'))
      .finally(() => setLoading(false))
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: name === 'slot' ? Number(value) : value
    }))
  }

  const handleAdd = async e => {
    e.preventDefault()
    setError(null)
    try {
      // Build the payload so Spring can bind the nested Faculty ID
      const payload = {
        ...form,
        // nest faculty inside the object
        faculty: { id: facultyId },
        // if your LectureSchedule also needs batch/semester, you'd do:
        // batch: { id: YOUR_BATCH_ID },
        // semester: { id: YOUR_SEMESTER_ID },
      }

      await API.post('/faculty/timetable', payload)
      setForm({
        dayOfWeek: 'Monday',
        slot: 1,
        startTime: '09:00',
        endTime: '10:00',
        subject: '',
        location: ''
      })
      fetchSlots()
    } catch {
      setError('Failed to add slot.')
    }
  }

  const handleDelete = async id => {
    setError(null)
    try {
      await API.delete(`/faculty/timetable/${id}`)
      fetchSlots()
    } catch {
      setError('Failed to delete slot.')
    }
  }

  if (loading) return <p className="p-6 text-gray-600">Loading…</p>

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Manage Timetable</h2>
      {error && <p className="text-red-600">{error}</p>}

      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 md:grid-cols-6 gap-2 bg-white p-4 rounded shadow"
      >
        <select
          name="dayOfWeek"
          value={form.dayOfWeek}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
            .map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <input
          name="slot"
          type="number"
          min="1"
          max="10"
          value={form.slot}
          onChange={handleChange}
          placeholder="Slot #"
          className="p-2 border rounded"
        />

        <input
          name="startTime"
          type="time"
          value={form.startTime}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="endTime"
          type="time"
          value={form.endTime}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="p-2 border rounded"
        />
        <input
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="md:col-span-6 bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
        >
          Add Slot
        </button>
      </form>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Day</th>
              <th className="p-3">Slot</th>
              <th className="p-3">Time</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Location</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.length === 0
              ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-500">
                    No slots yet.
                  </td>
                </tr>
              )
              : slots.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.dayOfWeek}</td>
                  <td className="p-3">{s.slot}</td>
                  <td className="p-3">
                    {s.startTime.slice(0,5)} – {s.endTime.slice(0,5)}
                  </td>
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3">{s.location}</td>
                  <td className="p-3 space-x-4">
                    <Link
                      to={`/faculty/take-attendance/${s.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Take Attendance
                    </Link>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
