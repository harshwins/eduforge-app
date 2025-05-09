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
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5173")
public class LectureScheduleController {

    private final LectureScheduleRepository lectureRepo;
    private final UserRepository            userRepo;

    @Autowired
    public LectureScheduleController(
        LectureScheduleRepository lectureRepo,
        UserRepository userRepo
    ) {
        this.lectureRepo = lectureRepo;
        this.userRepo    = userRepo;
    }

    /** 
     * GET /api/faculty/timetable?facultyId={id} 
     * List all lectures for that faculty 
     */
    @GetMapping("/timetable")
    public List<LectureSchedule> getMyLectures(
        @RequestParam("facultyId") Integer facultyId
    ) {
        userRepo.findById(facultyId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Faculty not found: " + facultyId));
        return lectureRepo.findByFaculty_Id(facultyId);
    }

    /** 
     * POST /api/faculty/timetable 
     * Add a new lecture slot (body must include faculty.id, batch.id, subject, startTime, etc.)
     */
    @PostMapping("/timetable")
    @ResponseStatus(HttpStatus.CREATED)
    public LectureSchedule addLecture(
        @RequestBody LectureSchedule input
    ) {
        Integer fid = input.getFaculty().getId();
        userRepo.findById(fid)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid facultyId: " + fid));
        return lectureRepo.save(input);
    }

    /** 
     * DELETE /api/faculty/timetable/{id} 
     * Remove a lecture slot 
     */
    @DeleteMapping("/timetable/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLecture(@PathVariable Integer id) {
        if (!lectureRepo.existsById(id)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Lecture not found: " + id);
        }
        lectureRepo.deleteById(id);
    }
}
