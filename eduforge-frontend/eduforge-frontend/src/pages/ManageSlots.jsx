import React, { useState, useEffect } from 'react';
import API from '../api';

export default function ManageSlots() {
  const [slots, setSlots]   = useState([]);
  const [error, setError]   = useState(null);

  const facultyId = parseInt(localStorage.getItem('userId'), 10);

  useEffect(() => {
    API.post('/faculty/slots', { facultyId })
      .then(res => setSlots(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load slots.');
      });
  }, []);

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Slots</h2>
      <ul className="space-y-2">
        {slots.length > 0 ? (
          slots.map(s => (
            <li key={s.id} className="bg-white p-4 rounded shadow">
              <div><strong>ID:</strong> {s.id}</div>
              <div><strong>Course:</strong> {s.courseName}</div>
              <div><strong>Time:</strong> {new Date(s.startTime).toLocaleString()}</div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No slots found.</li>
        )}
      </ul>
    </div>
  );
}

