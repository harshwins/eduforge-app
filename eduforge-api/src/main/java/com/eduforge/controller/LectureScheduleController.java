package com.eduforge.controller;

import com.eduforge.model.LectureSchedule;
import com.eduforge.model.User;
import com.eduforge.repository.LectureScheduleRepository;
import com.eduforge.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")   // allow your Vite dev server
public class LectureScheduleController {

    private final LectureScheduleRepository lectureRepo;
    private final UserRepository             userRepo;

    @Autowired
    public LectureScheduleController(LectureScheduleRepository lectureRepo,
                                     UserRepository userRepo) {
        this.lectureRepo = lectureRepo;
        this.userRepo    = userRepo;
    }

    /** Faculty: list your lectures */
    @GetMapping("/faculty/timetable")
    public List<LectureSchedule> getMyLectures(@RequestParam("facultyId") Integer facultyId) {
        userRepo.findById(facultyId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Faculty not found: " + facultyId));
        return lectureRepo.findByFaculty_Id(facultyId);
    }

    /** Faculty: add a new lecture slot */
    @PostMapping("/faculty/timetable")
    public LectureSchedule addLecture(@RequestBody LectureSchedule input) {
        // verify faculty exists
        Integer fid = input.getFaculty().getId();
        userRepo.findById(fid)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid facultyId: " + fid));
        return lectureRepo.save(input);
    }

    /** Faculty: delete a lecture slot */
    @DeleteMapping("/faculty/timetable/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLecture(@PathVariable Integer id) {
        if (!lectureRepo.existsById(id)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Lecture not found: " + id);
        }
        lectureRepo.deleteById(id);
    }

    /** Student: list your batch’s lectures */
    @GetMapping("/students/{studentId}/timetable")
    public List<LectureSchedule> getStudentTimetable(@PathVariable Integer studentId) {
        User student = userRepo.findById(studentId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Student not found: " + studentId));
        Integer batchId = student.getBatch() != null
                            ? student.getBatch().getId()
                            : null;
        if (batchId == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Student has no batch assigned");
        }
        return lectureRepo.findByBatch_Id(batchId);
    }
}
