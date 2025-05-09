package com.eduforge.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "batch")
public class Batch {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "batch")
    private List<User> students;

    @OneToMany(mappedBy = "batch")
    private List<LectureSchedule> lectureSchedules;

    public Batch() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<User> getStudents() { return students; }
    public void setStudents(List<User> students) { this.students = students; }

    public List<LectureSchedule> getLectureSchedules() { return lectureSchedules; }
    public void setLectureSchedules(List<LectureSchedule> lectureSchedules) {
        this.lectureSchedules = lectureSchedules;
    }
}
