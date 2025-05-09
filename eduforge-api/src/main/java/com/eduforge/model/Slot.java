package com.eduforge.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "slot")
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long facultyId;
    private String courseName;
    private LocalDateTime startTime;

    // Constructors
    public Slot() {}
    public Slot(Long facultyId, String courseName, LocalDateTime startTime) {
        this.facultyId = facultyId;
        this.courseName = courseName;
        this.startTime = startTime;
    }

    // Getters & setters
    public Long getId() { return id; }
    public Long getFacultyId() { return facultyId; }
    public void setFacultyId(Long facultyId) { this.facultyId = facultyId; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
}
