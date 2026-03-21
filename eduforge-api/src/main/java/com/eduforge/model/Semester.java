package com.eduforge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "semester")
public class Semester {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

   @OneToMany(mappedBy = "semester")
   @JsonIgnore
private List<TimetableEntry> timetableEntries;

    @OneToMany(mappedBy = "semester")
    @JsonIgnore
    private List<SemesterPolicy> policies;

    public Semester() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

 public List<TimetableEntry> getTimetableEntries() { return timetableEntries; }
public void setTimetableEntries(List<TimetableEntry> timetableEntries) {
    this.timetableEntries = timetableEntries;
}

    public List<SemesterPolicy> getPolicies() { return policies; }
    public void setPolicies(List<SemesterPolicy> policies) { this.policies = policies; }
}
