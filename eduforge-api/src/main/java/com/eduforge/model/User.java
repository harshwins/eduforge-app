// src/main/java/com/eduforge/model/User.java
package com.eduforge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 10)
    private String role;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    // ===== OTP =====

    @Column(length = 6)
    private String otp;

    private LocalDateTime otpExpiry;

    @Column(nullable = false)
    private boolean verified = false;

    // =====================================================
    // RELATIONSHIPS
    // =====================================================

    // ---------- STUDENT SIDE ----------

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    // ---------- FACULTY SIDE ----------

    @OneToMany(mappedBy = "faculty")
    @JsonIgnore
    private List<TimetableEntry> timetableEntries;

    // ---------- ATTENDANCE ----------

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<Attendance> attendances;

    @OneToMany(mappedBy = "markedBy")
    @JsonIgnore
    private List<Attendance> markedAttendances;

    public User() {}

    // ================= GETTERS & SETTERS =================

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    // OTP

    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }

    public LocalDateTime getOtpExpiry() { return otpExpiry; }
    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    // RELATIONS

    public Batch getBatch() { return batch; }
    public void setBatch(Batch batch) { this.batch = batch; }

    public Semester getSemester() { return semester; }
    public void setSemester(Semester semester) { this.semester = semester; }

    public List<TimetableEntry> getTimetableEntries() { return timetableEntries; }
    public void setTimetableEntries(List<TimetableEntry> timetableEntries) {
        this.timetableEntries = timetableEntries;
    }

    public List<Attendance> getAttendances() { return attendances; }
    public void setAttendances(List<Attendance> attendances) { this.attendances = attendances; }

    public List<Attendance> getMarkedAttendances() { return markedAttendances; }
    public void setMarkedAttendances(List<Attendance> markedAttendances) {
        this.markedAttendances = markedAttendances;
    }
}