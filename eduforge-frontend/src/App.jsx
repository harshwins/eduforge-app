import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// public
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Verify from "./pages/VerifyOTP.jsx";

// student
import StudentLayout from "./pages/StudentLayout.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentAttendance from "./pages/StudentAttendance.jsx";
import StudentEvents from "./pages/StudentEvents.jsx";
import StudentTimetable from "./pages/StudentTimetable.jsx";

// faculty
import FacultyLayout from "./pages/FacultyLayout.jsx";
import FacultyDashboard from "./pages/FacultyDashboard.jsx";
import FacultyRegistrations from "./pages/FacultyRegistrations.jsx";
import ManageTimetable from "./pages/ManageTimetable.jsx";
import FacultyAttendance from "./pages/FacultyAttendance.jsx";

// admin
import AdminLayout from "./pages/AdminLayout.jsx";
import AdminOverview from "./pages/AdminOverview.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import ManageEvents from "./pages/ManageEvents.jsx";

export default function App() {
  return (
    <>
      {/* 🔥 GLOBAL TOASTS */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2600,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            borderLeft: "6px solid #ea580c", // ORANGE ACCENT
            borderRadius: "10px",
            padding: "12px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: "#ea580c", // orange icon
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ea580c",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Routes>
        {/* public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOTP" element={<Verify />} />

        {/* student area */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="StudentAttendance" element={<StudentAttendance />} />
          <Route path="events" element={<StudentEvents />} />
          <Route path="timetable" element={<StudentTimetable />} />
        </Route>

        {/* faculty area */}
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="pending" element={<FacultyRegistrations />} />
          <Route path="timetable" element={<ManageTimetable />} />
          <Route path="take-attendance">
            <Route
              index
              element={
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No lecture selected
                  </h3>
                  <p className="text-gray-500">
                    Choose a lecture from your timetable to mark attendance.
                  </p>
                </div>
              }
            />
            <Route path=":lectureId" element={<FacultyAttendance />} />
          </Route>
        </Route>

        {/* admin area */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="events" element={<ManageEvents />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
