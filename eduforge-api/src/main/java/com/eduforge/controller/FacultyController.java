package com.eduforge.controller;

import com.eduforge.dto.TimetableFilter;
import com.eduforge.model.Slot;
import com.eduforge.repository.SlotRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyController {

    private final SlotRepository slots;

    @Autowired
    public FacultyController(SlotRepository slots) {
        this.slots = slots;
    }

    /**
     * POST /api/faculty/slots
     * (previously /timetable) — returns Slot DTOs for a faculty’s timetable
     */
    @PostMapping("/slots")
    public List<Slot> getSlots(@RequestBody TimetableFilter filter) {
        return slots.findByFacultyId(filter.getFacultyId());
    }
}
