// src/main/java/com/eduforge/controller/StudentAttendanceController.java
package com.eduforge.controller;

import com.eduforge.dto.AttendanceSummaryDto;
import com.eduforge.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentAttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepo;

    // ✅ Original route (used in new version of frontend)
    @GetMapping("/{studentId}/attendance-summary")
    public List<AttendanceSummaryDto> getAttendanceSummary(@PathVariable Integer studentId) {
        System.out.println("Fetching attendance for student: " + studentId);
        List<AttendanceSummaryDto> result = attendanceRepo.getAttendanceSummaryByStudent(studentId);
        System.out.println("Fetched rows: " + result.size());
        return result;
    }
    

    // ✅ Add this alias route to match frontend fallback
    @GetMapping("/{studentId}/attendance")
    public List<AttendanceSummaryDto> getAttendanceLegacy(@PathVariable Integer studentId) {
        return attendanceRepo.getAttendanceSummaryByStudent(studentId);
    }
}
