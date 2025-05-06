// src/pages/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageUsers() {
  // plain JS state, no <> generics
  const [activeTab, setActiveTab] = useState('students');
  const [users, setUsers]         = useState([]);
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');

  // fetch list whenever tab changes
  useEffect(() => {
    (async () => {
      try {
        const path = activeTab === 'students'
          ? '/api/admin/students'
          : '/api/admin/faculty';
        const { data } = await axios.get(`http://localhost:8080${path}`);
        setUsers(data);
      } catch (err) {
        console.error('Failed to load', err);
      }
    })();
  }, [activeTab]);

  // create handler
  const handleCreate = async e => {
    e.preventDefault();
    try {
      const path = activeTab === 'students'
        ? '/api/admin/students'
        : '/api/admin/faculty';
      await axios.post(`http://localhost:8080${path}`, { name, email, password });
      setName(''); setEmail(''); setPassword('');
      // refetch
      const { data } = await axios.get(`http://localhost:8080${path}`);
      setUsers(data);
    } catch (err) {
      console.error('Create failed', err);
    }
  };

  // delete handler
  const handleDelete = async id => {
    if (!window.confirm('Remove this user?')) return;
    try {
      const path = activeTab === 'students'
        ? '/api/admin/students'
        : '/api/admin/faculty';
      await axios.delete(`http://localhost:8080${path}/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="p-6">
      {/* tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded ${
            activeTab === 'students'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Manage Students
        </button>
        <button
          onClick={() => setActiveTab('faculty')}
          className={`px-4 py-2 rounded ${
            activeTab === 'faculty'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Manage Faculty
        </button>
      </div>

      {/* create form */}
      <form onSubmit={handleCreate} className="mb-8 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          Add New {activeTab === 'students' ? 'Student' : 'Faculty'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          Create {activeTab === 'students' ? 'Student' : 'Faculty'}
        </button>
      </form>

      {/* table */}
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 w-1/12">#</th>
              <th className="p-3 w-4/12">Name</th>
              <th className="p-3 w-5/12">Email</th>
              <th className="p-3 w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No {activeTab === 'students' ? 'students' : 'faculty'} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
