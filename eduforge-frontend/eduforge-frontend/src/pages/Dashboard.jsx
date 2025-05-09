// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to EduForge</h1>
      <button
        onClick={() => nav('/')}
        className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
      >
        Logout
      </button>
    </div>
  );
}
