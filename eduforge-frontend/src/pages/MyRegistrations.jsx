// src/pages/MyRegistrations.jsx
import React, { useEffect, useState } from 'react'
import API from '../api';

export default function MyRegistrations() {
  const [regs, setRegs] = useState([])
  const studentId = /* your logged-in id */ 6

  useEffect(() => {
    API.get(`http://localhost:8080/api/students/${studentId}/registrations`)
      .then(res => setRegs(res.data))
      .catch(console.error)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Event Registrations</h1>
      <table className="w-full bg-white rounded shadow overflow-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Event</th>
            <th className="p-3">Paid?</th>
            <th className="p-3">Accepted?</th>
            <th className="p-3">When</th>
          </tr>
        </thead>
        <tbody>
          {regs.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-3">{r.event.title}</td>
              <td className="p-3">{r.paid ? 'Yes' : 'No'}</td>
              <td className="p-3">
                {r.event.paid
                  ? (r.accepted ? '✅ Accepted' : '⏳ Pending')
                  : 'Auto-Accepted'}
              </td>
              <td className="p-3">{new Date(r.registeredAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
    