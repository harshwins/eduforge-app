// src/main/java/com/eduforge/controller/UserController.java
package com.eduforge.controller;

import com.eduforge.model.User;
import com.eduforge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    //───────────────────────────────────────────────────────────────────────────
    // DTO for creating STUDENT/FACULTY
    public static class CreateUserRequest {
        public String name;
        public String email;
        public String password;
    }

    //───────────────────────────────────────────────────────────────────────────
    // ADMIN: STUDENTS

    @GetMapping("/admin/students")
    public List<User> listStudents() {
        return userRepo.findByRole("STUDENT");
    }

    @PostMapping("/admin/students")
    public ResponseEntity<User> createStudent(@RequestBody CreateUserRequest req) {
        User u = new User();
        u.setName(req.name);
        u.setEmail(req.email);
        u.setPassword(req.password);
        u.setRole("STUDENT");
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepo.save(u));
    }

    @DeleteMapping("/admin/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        userRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //───────────────────────────────────────────────────────────────────────────
    // ADMIN: FACULTY

    @GetMapping("/admin/faculty")
    public List<User> listFaculty() {
        return userRepo.findByRole("FACULTY");
    }

    @PostMapping("/admin/faculty")
    public ResponseEntity<User> createFaculty(@RequestBody CreateUserRequest req) {
        User u = new User();
        u.setName(req.name);
        u.setEmail(req.email);
        u.setPassword(req.password);
        u.setRole("FACULTY");
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepo.save(u));
    }

    @DeleteMapping("/admin/faculty/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Integer id) {
        userRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //───────────────────────────────────────────────────────────────────────────
    // PUBLIC: Fetch a single user (so front-end can read name, profileImageUrl, etc.)

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        return userRepo.findById(id)
            .map(u -> ResponseEntity.ok(u))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //───────────────────────────────────────────────────────────────────────────
    // PUBLIC: Upload or replace avatar for a user

    @PostMapping("/users/{id}/avatar")
    public ResponseEntity<Map<String, String>> uploadAvatar(
        @PathVariable Integer id,
        @RequestParam("file") MultipartFile file
    ) {
        User user = userRepo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Generate a safe filename
        String filename = UUID.randomUUID().toString()
                        + "-"
                        + Paths.get(file.getOriginalFilename()).getFileName().toString();
        Path uploadDir = Paths.get("uploads");
        Path target    = uploadDir.resolve(filename);

        try {
            Files.createDirectories(uploadDir);
            file.transferTo(target.toFile());
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not save file", ex);
        }

        // Build public URL
        String url = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/uploads/")
                        .path(filename)
                        .toUriString();

        user.setProfileImageUrl(url);
        userRepo.save(user);

        return ResponseEntity.ok(Collections.singletonMap("url", url));
    }
}
