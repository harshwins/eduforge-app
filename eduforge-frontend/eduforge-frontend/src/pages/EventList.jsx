// src/pages/EventsList.jsx
import React, { useEffect, useState } from 'react'
import API from '../api';

export default function EventsList() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    API.get('http://localhost:8080/api/events')
      .then(res => setEvents(res.data))
      .catch(console.error)
  }, [])

  const register = async (id, paid) => {
    const studentId = /* get from your auth/session */ 6
    await API.post(`http://localhost:8080/api/events/${id}/register`, { studentId, paid })
    alert('Registered!')
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">All Events</h1>
      {events.map(e => (
        <div key={e.id} className="border p-4 rounded shadow">
          <h2 className="text-2xl">{e.title}</h2>
          <p>{e.description}</p>
          <p><strong>When:</strong> {new Date(e.eventDateTime).toLocaleString()}</p>
          <p><strong>Where:</strong> {e.location}</p>
          <p>
            {e.paid
              ? `Fee: $${(e.fee/100).toFixed(2)}`
              : 'Free Event'}
          </p>
          <button
            onClick={() => register(e.id, e.paid)}
            className="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            {e.paid ? 'Pay & Register' : 'Register'}
          </button>
        </div>
      ))}
    </div>
  )
}
