package com.eduforge.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "semester_policy")
public class SemesterPolicy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(name = "min_attendance_percent", nullable = false)
    private Integer minAttendancePercent;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    public SemesterPolicy() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Semester getSemester() { return semester; }
    public void setSemester(Semester semester) { this.semester = semester; }

    public String getPolicyName() { return policyName; }
    public void setPolicyName(String policyName) { this.policyName = policyName; }

    public Integer getMinAttendancePercent() { return minAttendancePercent; }
    public void setMinAttendancePercent(Integer minAttendancePercent) { this.minAttendancePercent = minAttendancePercent; }

    public LocalDate getEffectiveFrom() { return effectiveFrom; }
    public void setEffectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; }

    public LocalDate getEffectiveTo() { return effectiveTo; }
    public void setEffectiveTo(LocalDate effectiveTo) { this.effectiveTo = effectiveTo; }
}
