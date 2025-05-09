import React, { useState, useEffect } from 'react';
import API from '../api';

export default function StudentAttendance() {
  const [summary, setSummary] = useState([]);
  const [error, setError]     = useState(null);
  const studentId = parseInt(localStorage.getItem('userId'), 10);

  useEffect(() => {
    API.get('/student/attendance-summary', {
      params: { studentId }
    })
    .then(res => setSummary(res.data))
    .catch(err => {
      console.error(err);
      setError('Could not load attendance summary.');
    });
  }, []);

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }
  if (!summary.length) {
    return <div className="p-6 text-gray-500">No attendance records found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Subject</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Attended</th>
            <th className="p-2">Total</th>
            <th className="p-2">%</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((row, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{row.subject}</td>
              <td className="p-2">{row.semester}</td>
              <td className="p-2">{row.attended}</td>
              <td className="p-2">{row.total}</td>
              <td className="p-2">{row.percent.toFixed(2)}%</td>
              <td className="p-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
