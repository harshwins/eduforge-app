package com.eduforge.controller;

import com.eduforge.model.Event;
import com.eduforge.model.EventRegistration;
import com.eduforge.model.User;
import com.eduforge.repository.EventRepository;
import com.eduforge.repository.EventRegistrationRepository;
import com.eduforge.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired private EventRepository             eventRepo;
    @Autowired private EventRegistrationRepository regRepo;
    @Autowired private UserRepository              userRepo;

    // ── DTO for event creation ───────────────────────────────────────────────
    public static class CreateEventReq {
        public String title;
        public String description;
        public String location;
        public String eventDateTime; // e.g., "2025-07-01T10:00:00"
        public boolean paid;
        public Integer fee;
        public Integer createdByFacultyId;
    }

    // ── Admin/Faculty: Create an event ────────────────────────────────────────
    @PostMapping("/admin/events")
    public ResponseEntity<?> createEvent(@RequestBody CreateEventReq r) {
        if (r.createdByFacultyId == null) {
            return ResponseEntity.badRequest().body("Missing createdByFacultyId");
        }

        Optional<User> faculty = userRepo.findById(r.createdByFacultyId);
        if (faculty.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Faculty with ID " + r.createdByFacultyId + " not found.");
        }

        LocalDateTime dt;
        try {
            dt = LocalDateTime.parse(r.eventDateTime);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid date-time format. Use: YYYY-MM-DDTHH:MM:SS");
        }

        Event e = new Event();
        e.setTitle(r.title);
        e.setDescription(r.description);
        e.setLocation(r.location);
        e.setEventDateTime(dt);
        e.setPaid(r.paid);
        e.setFee(r.paid ? r.fee : 0);
        e.setCreatedBy(faculty.get());

        Event saved = eventRepo.save(e);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ── Delete event ───────────────────────────────────────────────────────────
    @DeleteMapping("/admin/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        if (!eventRepo.existsById(id)) return ResponseEntity.notFound().build();
        eventRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ── Public: List all events ────────────────────────────────────────────────
    @GetMapping("/events")
    public List<Event> listAllEvents() {
        return eventRepo.findAll();
    }

    // ── Student: Register for an event ─────────────────────────────────────────
    public static class RegisterReq {
        public Integer studentId;
        public boolean paid;
    }

    @PostMapping("/events/{eventId}/register")
    public ResponseEntity<?> registerForEvent(
        @PathVariable Integer eventId,
        @RequestBody RegisterReq req
    ) {
        Optional<Event> ev = eventRepo.findById(eventId);
        Optional<User>  st = userRepo.findById(req.studentId);

        if (ev.isEmpty()) return ResponseEntity.badRequest().body("Event not found");
        if (st.isEmpty()) return ResponseEntity.badRequest().body("Student not found");

        EventRegistration r = new EventRegistration();
        r.setEvent(ev.get());
        r.setStudent(st.get());
        r.setPaid(req.paid);
        r.setAccepted(!ev.get().isPaid());

        return ResponseEntity.status(HttpStatus.CREATED).body(regRepo.save(r));
    }

    // ── Student: View their registrations ──────────────────────────────────────
    @GetMapping("/students/{studentId}/registrations")
    public List<EventRegistration> getStudentRegistrations(@PathVariable Integer studentId) {
        return regRepo.findByStudent_Id(studentId);
    }

    // ── Faculty: View all events ───────────────────────────────────────────────
    @GetMapping("/faculty/events")
    public List<Event> getAllEventsForFaculty() {
        return eventRepo.findAll();
    }

    // ── Faculty: View all pending event registrations ──────────────────────────
    @GetMapping("/faculty/registrations/pending")
    public List<EventRegistration> getAllPendingRegistrations() {
        return regRepo.findByAcceptedFalse();
    }

    // ── Faculty: Accept/Reject a registration ──────────────────────────────────
    @PatchMapping("/faculty/registrations/{regId}")
    public ResponseEntity<EventRegistration> decideRegistration(
        @PathVariable Integer regId,
        @RequestParam boolean accept
    ) {
        return regRepo.findById(regId)
            .map(r -> {
                r.setAccepted(accept);
                return ResponseEntity.ok(regRepo.save(r));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ── Faculty: View registrations for specific event ─────────────────────────
    @GetMapping("/faculty/events/{eventId}/registrations")
    public List<EventRegistration> getRegistrationsForEvent(
        @PathVariable Integer eventId
    ) {
        return regRepo.findByEvent_Id(eventId);
    }
}
