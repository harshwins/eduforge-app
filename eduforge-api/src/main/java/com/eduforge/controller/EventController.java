package com.eduforge.controller;

import com.eduforge.model.Event;
import com.eduforge.model.EventRegistration;
import com.eduforge.model.User;
import com.eduforge.repository.EventRepository;
import com.eduforge.repository.EventRegistrationRepository;
import com.eduforge.repository.UserRepository;
import com.fasterxml.jackson.annotation.JsonFormat;

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

    // ── Admin/Faculty: Create an event ────────────────────────────────────────────
    public static class CreateEventReq {
        public String title;
        public String description;
        public String location;
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        public LocalDateTime eventDateTime;
        public boolean paid;
        public Integer fee;
        public Integer createdByFacultyId;
    }

    @PostMapping("/admin/events")
    public ResponseEntity<Event> createEvent(@RequestBody CreateEventReq r) {
        Event e = new Event();
        e.setTitle(r.title);
        e.setDescription(r.description);
        e.setLocation(r.location);
        e.setEventDateTime(r.eventDateTime);
        e.setPaid(r.paid);
        e.setFee(r.paid ? r.fee : 0);
        userRepo.findById(r.createdByFacultyId).ifPresent(e::setCreatedBy);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(eventRepo.save(e));
    }

    @DeleteMapping("/admin/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        if (!eventRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ── Public: List all events ──────────────────────────────────────────────────
    @GetMapping("/events")
    public List<Event> listAllEvents() {
        return eventRepo.findAll();
    }

    // ── Student: Register for an event ────────────────────────────────────────────
    public static class RegisterReq {
        public Integer studentId;
        public boolean paid;
    }

    @PostMapping("/events/{eventId}/register")
    public ResponseEntity<EventRegistration> registerForEvent(
        @PathVariable Integer eventId,
        @RequestBody RegisterReq req
    ) {
        Optional<Event> ev = eventRepo.findById(eventId);
        Optional<User>  st = userRepo.findById(req.studentId);
        if (ev.isEmpty() || st.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        EventRegistration r = new EventRegistration();
        r.setEvent(ev.get());
        r.setStudent(st.get());
        r.setPaid(req.paid);
        // auto-accept free events
        r.setAccepted(!ev.get().isPaid());
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(regRepo.save(r));
    }

    @GetMapping("/students/{studentId}/registrations")
    public List<EventRegistration> getStudentRegistrations(
        @PathVariable Integer studentId
    ) {
        return regRepo.findByStudent_Id(studentId);
    }

    // ── Faculty: View all events & pending registrations ─────────────────────────
    @GetMapping("/faculty/events")
    public List<Event> getAllEventsForFaculty() {
        // Faculty now sees every event
        return eventRepo.findAll();
    }

    @GetMapping("/faculty/registrations/pending")
    public List<EventRegistration> getAllPendingRegistrations() {
        // All registrations that have not yet been accepted
        return regRepo.findByAcceptedFalse();
    }

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

    @GetMapping("/faculty/events/{eventId}/registrations")
    public List<EventRegistration> getRegistrationsForEvent(
        @PathVariable Integer eventId
    ) {
        return regRepo.findByEvent_Id(eventId);
    }
}
