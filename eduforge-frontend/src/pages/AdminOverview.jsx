// src/pages/AdminOverview.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

export default function AdminOverview() {
  const [studentCount, setStudentCount]   = useState(0);
  const [facultyCount, setFacultyCount]   = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [activeSemester]                  = useState('4');  // HOD of semester 4

  // ← read exactly the same key
  const adminName = localStorage.getItem('adminName') || 'Admin';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [stuRes, facRes, evtRes] = await Promise.all([
          API.get('http://localhost:8080/api/admin/students'),
          API.get('http://localhost:8080/api/admin/faculty'),
          API.get('http://localhost:8080/api/events'),
        ]);

        setStudentCount(Array.isArray(stuRes.data) ? stuRes.data.length : 0);
        setFacultyCount(Array.isArray(facRes.data) ? facRes.data.length : 0);

        const now = new Date();
        setUpcomingCount(
          Array.isArray(evtRes.data)
            ? evtRes.data.filter(e => new Date(e.eventDateTime) > now).length
            : 0
        );
      } catch (err) {
        console.error('Failed to load overview stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold">Hi, {adminName}!</h1>
        <h2 className="text-xl text-gray-700 mt-1">Overview</h2>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Total Students</h3>
          <p className="text-2xl font-bold mt-2">{studentCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Total Faculty</h3>
          <p className="text-2xl font-bold mt-2">{facultyCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Upcoming Events</h3>
          <p className="text-2xl font-bold mt-2">{upcomingCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Active Semester</h3>
          <p className="text-2xl font-bold mt-2">{activeSemester}</p>
        </div>
      </div>
    </div>
  );
}
