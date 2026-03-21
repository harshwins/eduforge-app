package com.eduforge.controller;

import com.eduforge.dto.CreateLectureRequest;
import com.eduforge.model.*;
import com.eduforge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyTimetableController {

    @Autowired
    private TimetableEntryRepository timetableRepo;

    @Autowired
    private BatchRepository batchRepo;

    @Autowired
    private SemesterRepository semesterRepo;

    @Autowired
    private UserRepository userRepo;

    // ---------- GET FACULTY TIMETABLE ----------

    @GetMapping("/timetable")
    public List<TimetableEntry> getTimetable(@RequestParam Integer facultyId) {
        return timetableRepo.findByFaculty_Id(facultyId);
    }

    // ---------- ADD SLOT ----------

    @PostMapping("/timetable")
    public ResponseEntity<?> addSlot(@RequestBody CreateLectureRequest req) {
        try {
            Batch batch = batchRepo.findById(req.getBatchId())
                .orElseThrow(() -> new RuntimeException("Invalid batch ID"));

            Semester sem = semesterRepo.findById(req.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Invalid semester ID"));

            User faculty = userRepo.findById(req.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Invalid faculty ID"));
            
            TimetableEntry entry = new TimetableEntry();
           
            entry.setDayOfWeek(req.getDayOfWeek());
            entry.setSlot(req.getSlot());
            entry.setStartTime(req.getStartTime());
            entry.setEndTime(req.getEndTime());
            entry.setSubject(req.getSubject());
            entry.setLocation(req.getLocation());
            entry.setFaculty(faculty);
            entry.setCreatedBy(faculty);
            entry.setBatch(batch);
            entry.setSemester(sem);

            timetableRepo.save(entry);

            return ResponseEntity.ok("Slot added.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Error: " + e.getMessage());
        }
    }

    // ---------- DELETE SLOT ----------

    @DeleteMapping("/timetable/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable Integer id) {
        timetableRepo.deleteById(id);
        return ResponseEntity.ok("Slot deleted.");
    }
}