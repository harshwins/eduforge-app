import React, { useState, useEffect } from 'react';
import API from '../api';

export default function ManageTimetable() {
  const [lectures, setLectures] = useState([]);
  const [error, setError]       = useState(null);

  // form state for adding a new lecture
  const [batchId, setBatchId]       = useState('');
  const [subject, setSubject]       = useState('');
  const [startTime, setStartTime]   = useState(''); // e.g. "2025-05-10T09:00"
  
  const facultyId = parseInt(localStorage.getItem('userId'), 10);

  // load existing lectures
  useEffect(() => {
    API.get('/faculty/timetable', { params: { facultyId } })
      .then(res => setLectures(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not load timetable.');
      });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        faculty: { id: facultyId },
        batch:   { id: parseInt(batchId, 10) },
        subject,
        startTime,
      };
      await API.post('/faculty/timetable', payload);
      // refresh list
      const { data } = await API.get('/faculty/timetable', { params: { facultyId } });
      setLectures(data);
      // clear form
      setBatchId(''); setSubject(''); setStartTime('');
    } catch (err) {
      console.error(err);
      alert('Failed to add lecture.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lecture?')) return;
    try {
      await API.delete(`/faculty/timetable/${id}`);
      setLectures(lectures.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
      alert('Could not delete lecture.');
    }
  };

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Timetable</h2>

      <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded shadow space-y-2">
        <div>
          <label>Batch ID:</label>
          <input
            type="number"
            value={batchId}
            onChange={e => setBatchId(e.target.value)}
            required
            className="border p-1 rounded w-full"
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
            className="border p-1 rounded w-full"
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            required
            className="border p-1 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Lecture
        </button>
      </form>

      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Batch</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Start Time</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map(l => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.id}</td>
                <td className="p-2">{l.batch.id}</td>
                <td className="p-2">{l.subject}</td>
                <td className="p-2">{new Date(l.startTime).toLocaleString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {lectures.length === 0 && (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-500">
                  No lectures scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
);
}
