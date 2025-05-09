package com.eduforge.controller;

import com.eduforge.model.User;
import com.eduforge.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;

    @Autowired
    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String email    = body.get("email");
        String password = body.get("password");

        return userRepo.findByEmail(email)
            .map(user -> {
                if (user.getPassword().equals(password)) {
                    // success
                    return ResponseEntity.ok(Map.of(
                        "userId", user.getId(),
                        "role",   user.getRole(),
                        "name",   user.getName()
                    ));
                } else {
                    return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error","Invalid credentials"));
                }
            })
            .orElseGet(() ->
                ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error","Invalid credentials"))
            );
    }
}
