package com.eduforge.model;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "timetable_entries")
public class TimetableEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // ---------- DAY ----------

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek;

    // ---------- SLOT ----------

    @Column(nullable = false)
    private Integer slot;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    // ---------- LECTURE INFO ----------

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String location;

    // ---------- RELATIONS ----------

    // Faculty who teaches the lecture
    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;

    // ⭐ REQUIRED: Faculty who created this entry
    @ManyToOne
    @JoinColumn(name = "created_by_faculty_id", nullable = false)
    private User createdBy;

    // Batch this lecture belongs to
    @ManyToOne
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

    // Semester
    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    // ---------- META ----------

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public TimetableEntry() {}

    // ---------- GETTERS / SETTERS ----------

    public Integer getId() { return id; }

    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public Integer getSlot() { return slot; }
    public void setSlot(Integer slot) { this.slot = slot; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public User getFaculty() { return faculty; }
    public void setFaculty(User faculty) { this.faculty = faculty; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public Batch getBatch() { return batch; }
    public void setBatch(Batch batch) { this.batch = batch; }

    public Semester getSemester() { return semester; }
    public void setSemester(Semester semester) { this.semester = semester; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}