package com.eduforge.model;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "lecture_schedule")
public class LectureSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** which batch this lecture is for */
    @ManyToOne(optional = false)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

    /** which faculty teaches this slot */
    @ManyToOne(optional = false)
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;

    /** semester */
    @ManyToOne(optional = false)
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    /** subject name */
    @Column(nullable = false)
    private String subject;

    /** day of week, e.g. "Monday" */
    @Column(name = "day_of_week", nullable = false, length = 10)
    private String dayOfWeek;

    /** slot number */
    @Column(nullable = false)
    private Integer slot;

    /** start time */
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    /** end time */
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    /** location or room */
    @Column(nullable = false)
    private String location;

    /** all attendance records for this lecture */
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL)
    private List<Attendance> attendances;

    // ─────────────────────────────────────────────
    // Getters and Setters
    // ─────────────────────────────────────────────

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Batch getBatch() {
        return batch;
    }
    public void setBatch(Batch batch) {
        this.batch = batch;
    }

    public User getFaculty() {
        return faculty;
    }
    public void setFaculty(User faculty) {
        this.faculty = faculty;
    }

    public Semester getSemester() {
        return semester;
    }
    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }
    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Integer getSlot() {
        return slot;
    }
    public void setSlot(Integer slot) {
        this.slot = slot;
    }

    public LocalTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public List<Attendance> getAttendances() {
        return attendances;
    }
    public void setAttendances(List<Attendance> attendances) {
        this.attendances = attendances;
    }
}
