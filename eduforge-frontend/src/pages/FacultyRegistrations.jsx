// src/pages/FacultyRegistrations.jsx
import React, { useState, useEffect } from 'react'
import API from '../api';

export default function FacultyRegistrations() {
  const facultyId = localStorage.getItem('userId')
  const [activeTab, setActiveTab]      = useState('pending')
  const [pending, setPending]          = useState([])
  const [events, setEvents]            = useState([])
  const [selectedEventId, setSelected] = useState(null)
  const [regs, setRegs]                = useState([])

  useEffect(() => {
    // reset drill‐down whenever we switch tabs
    setSelected(null)
    setRegs([])

    if (activeTab === 'pending') {
      console.log('👉 fetching pending for', facultyId)
      API
        .get(
          `http://localhost:8080/api/faculty/registrations/pending?facultyId=${facultyId}`
        )
        .then(r => {
          console.log('pending data', r.data)
          setPending(r.data)
        })
        .catch(err => console.error('pending err', err))
    } else {
      console.log('👉 fetching events for', facultyId)
      API
        .get(`http://localhost:8080/api/faculty/events?facultyId=${facultyId}`)
        .then(r => {
          console.log('events data', r.data)
          setEvents(r.data)
        })
        .catch(err => console.error('events err', err))
    }
  }, [activeTab, facultyId])

  const loadRegs = (eventId) => {
    setSelected(eventId)
    console.log('👉 loading regs for event', eventId)
    API
      .get(`http://localhost:8080/api/faculty/events/${eventId}/registrations`)
      .then(r => {
        console.log('regs data', r.data)
        setRegs(r.data)
      })
      .catch(err => console.error('regs err', err))
  }

  const decide = (regId, accept) => {
    API
      .patch(
        `http://localhost:8080/api/faculty/registrations/${regId}?accept=${accept}`
      )
      .then(() => {
        setPending(p => p.filter(x => x.id !== regId))
      })
      .catch(err => console.error('decide err', err))
  }

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded ${
            activeTab === 'pending'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded ${
            activeTab === 'events'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Event List
        </button>
      </div>

      {/* PENDING */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Event</th>
                <th className="p-3">Student</th>
                <th className="p-3">Paid?</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.event.title}</td>
                  <td className="p-3">{r.student.name}</td>
                  <td className="p-3">{r.paid ? 'Yes' : 'No'}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => decide(r.id, true)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => decide(r.id, false)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-3 text-center text-gray-500">
                    No pending registrations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* EVENT LIST */}
      {activeTab === 'events' && selectedEventId === null && (
        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 w-2/12">ID</th>
                <th className="p-3 w-6/12">Title</th>
                <th className="p-3 w-4/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id} className="border-t">
                  <td className="p-3">{e.id}</td>
                  <td className="p-3">{e.title}</td>
                  <td className="p-3">
                    <button
                      onClick={() => loadRegs(e.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      View Registrations
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    No events to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* REGISTRATIONS FOR A SPECIFIC EVENT */}
      {activeTab === 'events' && selectedEventId !== null && (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="mb-4 text-orange-600 hover:underline"
          >
            ← Back to events
          </button>
          <div className="bg-white rounded shadow overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Paid?</th>
                  <th className="p-3">Accepted?</th>
                </tr>
              </thead>
              <tbody>
                {regs.map(r => (
                  <tr key={r.id} className="border-t">
                    <td className="p-3">{r.student.name}</td>
                    <td className="p-3">{r.paid ? 'Yes' : 'No'}</td>
                    <td className="p-3">{r.accepted ? '✅' : '❌'}</td>
                  </tr>
                ))}
                {regs.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-gray-500">
                      No registrations for this event.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
