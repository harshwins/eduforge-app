package com.eduforge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // ---------- STUDENT ----------

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    // 🔥 LINK TO TIMETABLE ENTRY (NOT LectureSchedule)

    @ManyToOne(optional = false)
    @JoinColumn(name = "timetable_entry_id", nullable = false)
    @JsonIgnore
    private TimetableEntry timetableEntry;

    // ---------- DATE ----------

    @Column(nullable = false)
    private LocalDate date;

    // ---------- STATUS ----------

    @Column(nullable = false)
    private String status; // Present / Absent

    // ---------- WHO MARKED ----------

    @ManyToOne(optional = false)
    @JoinColumn(name = "marked_by", nullable = false)
    private User markedBy;

    public Attendance() {}

    // ---------- GETTERS / SETTERS ----------

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public TimetableEntry getTimetableEntry() { return timetableEntry; }
    public void setTimetableEntry(TimetableEntry timetableEntry) {
        this.timetableEntry = timetableEntry;
    }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getMarkedBy() { return markedBy; }
    public void setMarkedBy(User markedBy) { this.markedBy = markedBy; }
}