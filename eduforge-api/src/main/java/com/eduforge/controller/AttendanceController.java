// src/main/java/com/eduforge/controller/AttendanceController.java
package com.eduforge.controller;

import com.eduforge.model.Attendance;
import com.eduforge.model.LectureSchedule;
import com.eduforge.model.User;
import com.eduforge.repository.AttendanceRepository;
import com.eduforge.repository.LectureScheduleRepository;
import com.eduforge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceRepository      attendanceRepo;
    private final UserRepository            userRepo;
    private final LectureScheduleRepository lectureRepo;

    @Autowired
    public AttendanceController(
        AttendanceRepository attendanceRepo,
        UserRepository userRepo,
        LectureScheduleRepository lectureRepo
    ) {
        this.attendanceRepo = attendanceRepo;
        this.userRepo       = userRepo;
        this.lectureRepo    = lectureRepo;
    }

    // ── FACULTY: LOAD ROSTER FOR A SPECIFIC LECTURE ─────────────────────────────
    @GetMapping("/faculty/{facultyId}/attendance/{lectureId}/roster")
    public ResponseEntity<List<User>> getClassRoster(
        @PathVariable Integer facultyId,
        @PathVariable Integer lectureId
    ) {
        userRepo.findById(facultyId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Faculty not found: " + facultyId));

        LectureSchedule lecture = lectureRepo.findById(lectureId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Lecture not found: " + lectureId));

        List<User> roster = userRepo.findAllByBatch_Id(lecture.getBatch().getId());
        return ResponseEntity.ok(roster);
    }

    // DTO for incoming attendance records (rename so it’s not Attendance)
    public static class AttendanceDTO {
        public Integer studentId;
        public boolean present;
    }

    // ── FACULTY: RECORD ATTENDANCE FOR A SPECIFIC LECTURE ─────────────────────
    @PostMapping("/faculty/{facultyId}/attendance/{lectureId}")
    public ResponseEntity<Void> takeAttendance(
        @PathVariable Integer facultyId,
        @PathVariable Integer lectureId,
        @RequestBody List<AttendanceDTO> records
    ) {
        User recorder = userRepo.findById(facultyId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Faculty not found: " + facultyId));

        LectureSchedule lecture = lectureRepo.findById(lectureId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Lecture not found: " + lectureId));

        List<Attendance> toSave = new ArrayList<>();
        for (AttendanceDTO dto : records) {
            User student = userRepo.findById(dto.studentId)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid studentId: " + dto.studentId));

            Attendance a = new Attendance();
            a.setStudent(student);
            a.setLecture(lecture);
            a.setDate(LocalDate.now());
            a.setStatus(dto.present ? "Present" : "Absent");
            a.setMarkedBy(recorder);
            toSave.add(a);
        }

        attendanceRepo.saveAll(toSave);
        return ResponseEntity.ok().build();
    }
}
