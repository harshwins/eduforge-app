// src/pages/FacultyTimetable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FacultyTimetable() {
  const facultyId = Number(localStorage.getItem('userId'));
  
  // form state
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [slot, setSlot]           = useState(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime]     = useState('');
  const [subject, setSubject]     = useState('');
  const [location, setLocation]   = useState('');
  
  // existing slots
  const [slots, setSlots]         = useState([]);

  // load all slots
  const loadSlots = () => {
    axios
      .get(`http://localhost:8080/api/faculty/timetable?facultyId=${facultyId}`)
      .then(res => setSlots(res.data))
      .catch(console.error);
  };

  useEffect(loadSlots, [facultyId]);

  // submit handler
  const handleAdd = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/faculty/timetable', {
        dayOfWeek,
        slot,
        startTime,   // must be "HH:mm"
        endTime,     // must be "HH:mm"
        subject,
        location,
        createdByFacultyId: facultyId
      });
      // clear inputs & reload list
      setStartTime('');
      setEndTime('');
      setSubject('');
      setLocation('');
      loadSlots();
    } catch (err) {
      console.error(err.response?.data || err);
      alert('Failed to add slot: ' + (err.response?.status || err.message));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Timetable</h2>

      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <label className="block mb-1">Day</label>
          <select
            value={dayOfWeek}
            onChange={e => setDayOfWeek(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
              .map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-1">Slot #</label>
          <input
            type="number"
            min={1}
            value={slot}
            onChange={e => setSlot(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Course name"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Room or link"
            required
          />
        </div>

        <div className="col-span-full text-right">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
          >
            Add Slot
          </button>
        </div>
      </form>

      {/* Existing Slots Table */}
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Day</th>
              <th className="p-3">Slot #</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Location</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.dayOfWeek}</td>
                <td className="p-3">{s.slot}</td>
                <td className="p-3">{s.startTime}</td>
                <td className="p-3">{s.endTime}</td>
                <td className="p-3">{s.subject}</td>
                <td className="p-3">{s.location}</td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8080/api/faculty/timetable/${s.id}`)
                        .then(loadSlots);
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {slots.length === 0 && (
              <tr>
                <td colSpan={7} className="p-3 text-center text-gray-500">
                  No slots defined yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
    