    package com.eduforge.controller;

    import com.eduforge.model.*;
    import com.eduforge.repository.*;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/students")
    public class StudentTimetableController {

        @Autowired
        private TimetableEntryRepository timetableRepo;

        @Autowired
        private UserRepository userRepo;

        // ---------- STUDENT TIMETABLE ----------

        @GetMapping("/{studentId}/timetable")
        public ResponseEntity<List<TimetableEntry>> getTimetableForStudent(
                @PathVariable Integer studentId) {

            User student = userRepo.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Batch batch = student.getBatch();
            Semester semester = student.getSemester();

            if (batch == null || semester == null) {
                return ResponseEntity.badRequest().build();
            }

            List<TimetableEntry> list =
                    timetableRepo.findByBatch_IdAndSemester_Id(
                            batch.getId(),
                            semester.getId()
                    );

            return ResponseEntity.ok(list);
        }
    }