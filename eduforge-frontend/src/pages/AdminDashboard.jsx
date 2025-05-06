// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const [students, setStudents]       = useState([]);
  const [newName, setNewName]         = useState('');
  const [newEmail, setNewEmail]       = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate                       = useNavigate();

  // 1) Fetch existing students
  const fetchStudents = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/admin/students');
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2) Create a new student
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/admin/students', {
        name: newName,
        email: newEmail,
        password: newPassword,
      });
      // clear form + reload list
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      fetchStudents();
    } catch (err) {
      console.error('Create student error', err);
    }
  };

  // 3) Delete an existing student
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/students/${id}`);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      console.error('Delete student error', err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-600 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <button onClick={() => navigate('/admin')} className="text-left mb-2 hover:underline">
          Dashboard
        </button>
        <button onClick={() => navigate('/admin/users')} className="text-left mb-2 hover:underline">
          Manage Users
        </button>
        {/* add more nav links as needed */}
        <button
          onClick={logout}
          className="mt-auto bg-white text-orange-600 py-2 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Students &gt; Manage</h1>

        {/* Create student form */}
        <form onSubmit={handleCreate} className="mb-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            Create Student
          </button>
        </form>

        {/* Students table */}
        <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
  <thead className="bg-gray-200">
    <tr>
      {/* change header from “ID” to “No.” */}
      <th className="w-1/12 px-6 py-4 font-medium">No.</th>
      <th className="w-4/12 px-6 py-4 font-medium">Name</th>
      <th className="w-5/12 px-6 py-4 font-medium">Email</th>
      <th className="w-2/12 px-6 py-4 font-medium">Actions</th>
    </tr>
  </thead>
  <tbody>
    {students.map((s, idx) => (
      <tr key={s.id} className="border-t">
        {/* idx+1 is guaranteed gap-free */}
        <td className="p-3">{idx + 1}</td>
        <td className="p-3">{s.name}</td>
        <td className="p-3">{s.email}</td>
        <td className="p-3">
          <button
            onClick={() => handleDelete(s.id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </td>
      </tr>
    ))}
    {students.length === 0 && (
      <tr>
        <td colSpan="4" className="p-3 text-center text-gray-500">
          No students found.
        </td>
      </tr>
    )}
  </tbody>
</table>
  </div>

      </main>
    </div>
  );
}
