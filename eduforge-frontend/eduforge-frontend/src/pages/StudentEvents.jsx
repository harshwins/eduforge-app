// src/pages/StudentEvents.jsx
import React, { useState, useEffect } from 'react'
import API from '../api';

export default function StudentEvents() {
  const studentId = Number(localStorage.getItem('userId'))
  const [activeTab, setActiveTab] = useState('available')   // 'available' | 'registered'
  const [events, setEvents]     = useState([])
  const [myRegs, setMyRegs]     = useState([])

  // load both at once
  const loadData = async () => {
    try {
      const [evRes, regRes] = await Promise.all([
        API.get('http://localhost:8080/api/events'),
        API.get(`http://localhost:8080/api/students/${studentId}/registrations`)
      ])
      setEvents(evRes.data)
      setMyRegs(regRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [studentId])

  const handleRegister = async ev => {
    await API.post(
      `http://localhost:8080/api/events/${ev.id}/register`,
      { studentId, paid: ev.paid }
    )
    await loadData()
  }

  const availableEvents = events.filter(
    ev => !myRegs.some(r => r.event.id === ev.id)
  )

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded ${
            activeTab === 'available'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Available Events
        </button>
        <button
          onClick={() => setActiveTab('registered')}
          className={`px-4 py-2 rounded ${
            activeTab === 'registered'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          My Registrations
        </button>
      </div>

      {/* Available */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableEvents.length === 0 && (
            <p className="text-gray-500">No more events to register for.</p>
          )}
          {availableEvents.map(ev => (
            <div key={ev.id} className="bg-white p-4 rounded shadow space-y-2">
              <h3 className="text-xl font-semibold">{ev.title}</h3>
              <p>{new Date(ev.eventDateTime).toLocaleString()}</p>
              <p>{ev.location}</p>
              <p>{ev.paid ? `Fee: ₹${(ev.fee/100).toFixed(2)}` : 'Free'}</p>
              <button
                onClick={() => handleRegister(ev)}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}

      {/* My Registrations */}
      {activeTab === 'registered' && (
        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Event</th>
                <th className="p-3">Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {myRegs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-3 text-center text-gray-500">
                    You haven’t registered for any events yet.
                  </td>
                </tr>
              )}
              {myRegs.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.event.title}</td>
                  <td className="p-3">
                    {new Date(r.event.eventDateTime).toLocaleString()}
                  </td>
                  <td className="p-3">{r.event.location}</td>
                  <td className="p-3">
                    {r.accepted
                      ? <span className="text-green-600 font-medium">Accepted</span>
                      : <span className="text-orange-600 font-medium">Pending</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
