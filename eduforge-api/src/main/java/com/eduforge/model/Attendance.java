package com.eduforge.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private LectureSchedule lecture;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String status;  // "Present" or "Absent"

    @ManyToOne(optional = false)
    @JoinColumn(name = "marked_by", nullable = false)
    private User markedBy;

    public Attendance() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public LectureSchedule getLecture() { return lecture; }
    public void setLecture(LectureSchedule lecture) { this.lecture = lecture; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getMarkedBy() { return markedBy; }
    public void setMarkedBy(User markedBy) { this.markedBy = markedBy; }
}
