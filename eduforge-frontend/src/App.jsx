import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// public
import Login from './pages/Login.jsx'

// student
import StudentLayout     from './pages/StudentLayout.jsx'
import StudentDashboard  from './pages/StudentDashboard.jsx'
import Attendance        from './pages/Attendance.jsx'
import StudentAttendance from './pages/StudentAttendance.jsx'
import StudentEvents     from './pages/StudentEvents.jsx'
import StudentTimetable  from './pages/StudentTimetable.jsx'

// faculty
import FacultyLayout        from './pages/FacultyLayout.jsx'
import FacultyDashboard     from './pages/FacultyDashboard.jsx'
import FacultyRegistrations from './pages/FacultyRegistrations.jsx'
import ManageTimetable      from './pages/ManageTimetable.jsx'
import FacultyAttendance    from './pages/FacultyAttendance.jsx'

// admin
import AdminLayout   from './pages/AdminLayout.jsx'
import AdminOverview from './pages/AdminOverview.jsx'
import ManageUsers   from './pages/ManageUsers.jsx'
import ManageEvents  from './pages/ManageEvents.jsx'

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Login />} />

      {/* student area */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance-summary" element={<StudentAttendance />} />
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
              <div className="p-6 text-center text-gray-600">
                No lecture selected. Please pick one from your timetable.
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

      {/* catch‐all: redirect unknown URLs back to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
