package com.eduforge.controller;

import com.eduforge.model.StudentProfile;
import com.eduforge.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentProfileRepository studentRepo;

    @GetMapping
    public ResponseEntity<?> getAllStudents() {
        List<StudentProfile> students = studentRepo.findAll();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable int id) {
        return studentRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addStudent(@RequestBody StudentProfile student) {
        return ResponseEntity.ok(studentRepo.save(student));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable int id, @RequestBody StudentProfile updated) {
        return studentRepo.findById(id)
                .map(student -> {
                    student.setCourse(updated.getCourse());
                    student.setRollNo(updated.getRollNo());
                    student.setYear(updated.getYear());
                    student.setBatchId(updated.getBatchId());
                    return ResponseEntity.ok(studentRepo.save(student));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable int id) {
        studentRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Student deleted"));
    }
}
