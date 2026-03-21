package com.eduforge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "batch")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    // ---------- STUDENTS IN THIS BATCH ----------

    @OneToMany(mappedBy = "batch")
    @JsonIgnore
    private List<User> students;

    // ---------- TIMETABLE ENTRIES FOR THIS BATCH ----------

    @OneToMany(mappedBy = "batch")
    @JsonIgnore
    private List<TimetableEntry> timetableEntries;

    public Batch() {}

    // ---------- GETTERS / SETTERS ----------

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<User> getStudents() { return students; }
    public void setStudents(List<User> students) { this.students = students; }

    public List<TimetableEntry> getTimetableEntries() { return timetableEntries; }
    public void setTimetableEntries(List<TimetableEntry> timetableEntries) {
        this.timetableEntries = timetableEntries;
    }
}