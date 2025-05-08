// src/pages/ManageEvents.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

export default function ManageEvents() {
  const [events, setEvents]         = useState([]);
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation]     = useState('');
  const [dateTime, setDateTime]     = useState('');      // e.g. "2025-05-10T14:00"
  const [paid, setPaid]             = useState(false);
  const [fee, setFee]               = useState('');      // plain text, no spinner

  const facultyId = parseInt(localStorage.getItem('userId'), 10);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get('http://localhost:8080/api/events');
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        location,
        eventDateTime: dateTime,
        paid,
        // assume backend expects fee in paise, so multiply by 100:
        fee: paid ? parseInt(fee, 10) * 100 : 0,
        createdByFacultyId: facultyId,
      };
      await API.post('http://localhost:8080/api/admin/events', payload);
      // clear form & refresh
      setTitle('');
      setDescription('');
      setLocation('');
      setDateTime('');
      setPaid(false);
      setFee('');
      fetchEvents();
    } catch (err) {
      console.error('Event creation failed', err);
      alert(`Could not create event: ${err.response?.status || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this event?')) return;
    try {
      await API.delete(`http://localhost:8080/api/admin/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Could not delete event');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      <form onSubmit={handleCreate} className="mb-8 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={paid}
              onChange={e => setPaid(e.target.checked)}
            />
            <span>Paid event?</span>
          </label>
          {paid && (
            <input
              type="text"
              placeholder="Fee (e.g. 500)"
              className="border p-2 rounded"
              value={fee}
              onChange={e => setFee(e.target.value.replace(/\D/, ''))}
              required
            />
          )}
        </div>

        <textarea
          placeholder="Description"
          className="w-full mt-4 border p-2 rounded"
          rows="3"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          Create Event
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">When</th>
              <th className="p-3">Location</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.id}</td>
                <td className="p-3">{e.title}</td>
                <td className="p-3">
                  {new Date(e.eventDateTime).toLocaleString()}
                </td>
                <td className="p-3">{e.location}</td>
                <td className="p-3">
                  {e.paid 
                    ? `₹${(e.fee / 100).toFixed(2)}` 
                    : 'Free'}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
