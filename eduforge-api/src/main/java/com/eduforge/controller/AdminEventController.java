package com.eduforge.controller;

import com.eduforge.model.EventRegistration;
import com.eduforge.repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminEventController {

    @Autowired
    private EventRegistrationRepository regRepo;

    /**
     * GET /api/admin/events/{eventId}/registrations
     *   — list all registrations for a given event (both paid & free)
     */
    @GetMapping("/events/{eventId}/registrations")
    public List<EventRegistration> getRegistrationsForEvent(@PathVariable Integer eventId) {
        return regRepo.findByEvent_Id(eventId);
    }

    /**
     * PATCH /api/admin/registrations/{regId}?accept=true|false
     *   — optionally let admin accept/reject (if you want)
     */
    @PatchMapping("/registrations/{regId}")
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
}
