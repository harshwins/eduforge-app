// src/pages/FacultyAttendance.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function FacultyAttendance() {
  const { lectureId } = useParams();
  const facultyId     = localStorage.getItem('userId');
  const [roster, setRoster]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [idx, setIdx]         = useState(0);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!facultyId || !lectureId) {
      setError('Missing faculty or lecture ID.');
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8080/api/faculty/${facultyId}/attendance/${lectureId}/roster`)
      .then(res => { setRoster(res.data); setError(null); })
      .catch(() => setError('Failed to load roster.'))
      .finally(() => setLoading(false));
  }, [facultyId, lectureId]);

  if (loading) return <p>Loading roster…</p>;
  if (error)   return <p className="text-red-600">{error}</p>;
  if (idx >= roster.length) {
    // all marked → save
    const finish = async () => {
      try {
        await axios.post(
          `http://localhost:8080/api/faculty/${facultyId}/attendance/${lectureId}`,
          records
        );
        alert('✅ Attendance saved!');
      } catch {
        alert('❌ Failed to save attendance.');
      }
    };
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl mb-4">All done!</h2>
        <button
          onClick={finish}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Save Attendance
        </button>
      </div>
    );
  }

  const student = roster[idx];
  const mark = present => {
    setRecords(r => [...r, { studentId: student.id, present }]);
    setIdx(i => i + 1);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">
        {student.name} (#{student.id})
      </h2>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => mark(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Present
        </button>
        <button
          onClick={() => mark(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Absent
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        {idx + 1} / {roster.length}
      </p>
    </div>
  );
}
