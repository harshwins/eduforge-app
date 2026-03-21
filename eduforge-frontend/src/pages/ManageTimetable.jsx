import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function ManageTimetable() {
  const facultyId = Number(localStorage.getItem("userId"));

  const [slots, setSlots] = useState([]);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [form, setForm] = useState({
    dayOfWeek: "MONDAY",
    slot: 1,
    startTime: "09:00",
    endTime: "10:00",
    subject: "",
    location: "",
    batchId: "",
    semesterId: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------- LOAD DATA ----------

  useEffect(() => {
    fetchSlots();

    API.get("/api/batches")
      .then((res) =>
        setBatches(Array.isArray(res.data) ? res.data : [])
      );

    API.get("/api/semesters")
      .then((res) =>
        setSemesters(Array.isArray(res.data) ? res.data : [])
      );
  }, []);

  const fetchSlots = () => {
    setLoading(true);

    API.get(`/api/faculty/timetable?facultyId=${facultyId}`)
      .then((res) => {
        const data = res.data;

        // 🔥 CRITICAL FIX — ensure array
        if (Array.isArray(data)) setSlots(data);
        else if (Array.isArray(data?.data)) setSlots(data.data);
        else setSlots([]);
      })
      .catch(() => setError("Failed to load timetable."))
      .finally(() => setLoading(false));
  };

  // ---------- FORM ----------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "slot" ? Number(value) : value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/faculty/timetable/${id}`);
      fetchSlots();
    } catch {
      setError("Failed to delete slot.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.batchId || !form.semesterId) {
      return setError("Please select both batch and semester.");
    }

    try {
      const payload = {
        dayOfWeek: form.dayOfWeek,
        slot: form.slot,
        startTime: form.startTime,
        endTime: form.endTime,
        subject: form.subject,
        location: form.location,
        facultyId,
        batchId: Number(form.batchId),
        semesterId: Number(form.semesterId),
      };

      await API.post("/api/faculty/timetable", payload);

      setForm({
        dayOfWeek: "MONDAY",
        slot: 1,
        startTime: "09:00",
        endTime: "10:00",
        subject: "",
        location: "",
        batchId: "",
        semesterId: "",
      });

      fetchSlots();
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to add slot.");
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading…</p>;

  // ---------- GRID CONFIG ----------

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const safeSlots = Array.isArray(slots) ? slots : [];

  const timeSlots = [
    ...new Set(safeSlots.map((s) => `${s.startTime}-${s.endTime}`)),
  ].sort();

  const getLecture = (day, time) =>
    safeSlots.find(
      (s) => s.dayOfWeek === day && `${s.startTime}-${s.endTime}` === time
    );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Manage Timetable</h2>

      {error && <p className="text-red-600">{error}</p>}

      {/* ---------- ADD FORM ---------- */}

      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 md:grid-cols-6 gap-2 bg-white p-4 rounded shadow"
      >
        <select
          name="dayOfWeek"
          value={form.dayOfWeek}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          name="slot"
          type="number"
          min="1"
          max="10"
          value={form.slot}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="startTime"
          type="time"
          value={form.startTime}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          name="endTime"
          type="time"
          value={form.endTime}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="p-2 border rounded"
        />

        <input
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="p-2 border rounded"
        />

        <select
          name="batchId"
          value={form.batchId}
          onChange={handleChange}
          className="p-2 border rounded md:col-span-3"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name || `Batch ${b.id}`}
            </option>
          ))}
        </select>

        <select
          name="semesterId"
          value={form.semesterId}
          onChange={handleChange}
          className="p-2 border rounded md:col-span-3"
        >
          <option value="">Select Semester</option>
          {semesters.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name || `Semester ${s.id}`}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-6 bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
        >
          Add Slot
        </button>
      </form>

      {/* ---------- EXISTING SLOTS TABLE ---------- */}

      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Day</th>
              <th className="p-3">Slot</th>
              <th className="p-3">Time</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Location</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeSlots.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500">
                  No slots yet.
                </td>
              </tr>
            ) : (
              safeSlots.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.dayOfWeek}</td>
                  <td className="p-3">{s.slot}</td>
                  <td className="p-3">
                    {s.startTime.slice(0, 5)} – {s.endTime.slice(0, 5)}
                  </td>
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3">{s.location}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- WEEKLY GRID ---------- */}

      <h3 className="text-xl font-semibold">Weekly Timetable</h3>

      {safeSlots.length === 0 ? (
        <p className="text-gray-500">No slots defined.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2 text-left">Time</th>
                {days.map((day) => (
                  <th key={day} className="border p-2 text-center">
                    {day.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td className="border p-2 font-medium whitespace-nowrap">
                    {time.slice(0, 5)} – {time.slice(6, 11)}
                  </td>

                  {days.map((day) => {
                    const lec = getLecture(day, time);

                    return (
                      <td
                        key={day}
                        className="border p-2 text-center align-middle h-28"
                      >
                        {lec ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-semibold">
                              {lec.subject}
                            </div>

                            <div className="text-sm text-gray-600">
                              {lec.location}
                            </div>

                            <Link
                              to={`/faculty/take-attendance/${lec.id}`}
                              className="mt-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Take Attendance
                            </Link>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}