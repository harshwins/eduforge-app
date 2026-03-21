package com.eduforge.controller;

import com.eduforge.model.User;
import com.eduforge.repository.UserRepository;
import com.eduforge.service.EmailService;
import com.eduforge.utils.OtpUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final EmailService emailService;

    @Autowired
    public AuthController(UserRepository userRepo, EmailService emailService) {
        this.userRepo = userRepo;
        this.emailService = emailService;
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {

        String email = body.getOrDefault("email", "").trim().toLowerCase();
        String password = body.getOrDefault("password", "");

        if (email.isEmpty() || password.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Email and password required"));
        }

        return userRepo.findByEmailIgnoreCase(email)
            .map(user -> {

                // 🔒 BLOCK IF NOT VERIFIED
                if (!user.isVerified()) {
                    return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Please verify your email first"));
                }

                if (user.getPassword().equals(password)) {
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

    // ================= REGISTER (SEND OTP) =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {

        String name     = body.getOrDefault("name", "").trim();
        String email    = body.getOrDefault("email", "").trim().toLowerCase();
        String password = body.getOrDefault("password", "");

        if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "All fields are required"));
        }

        User existingUser = userRepo.findByEmailIgnoreCase(email).orElse(null);

        // ✅ If email exists & verified → block
        if (existingUser != null && existingUser.isVerified()) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Email already registered"));
        }

        User user = existingUser != null ? existingUser : new User();

        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);

        // ⭐ IMPORTANT: Must match DB values
        user.setRole("STUDENT");

        // ===== GENERATE OTP =====
        String otp = OtpUtil.generateOtp();

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        user.setVerified(false);

        userRepo.save(user);

        // 📧 SEND EMAIL (if configured)
        emailService.sendOtp(user.getEmail(), otp);

        return ResponseEntity.ok(
            Map.of("message", "OTP sent to email")
        );
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {

        String email = body.getOrDefault("email", "").trim().toLowerCase();
        String otp   = body.getOrDefault("otp", "");

        if (email.isEmpty() || otp.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Email and OTP required"));
        }

        User user = userRepo.findByEmailIgnoreCase(email).orElse(null);

        if (user == null) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "User not found"));
        }

        if (user.getOtp() == null || user.getOtpExpiry() == null) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "No OTP pending"));
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "OTP expired"));
        }

        if (!user.getOtp().equals(otp)) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Invalid OTP"));
        }

        // ✅ ACTIVATE ACCOUNT
        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepo.save(user);

        return ResponseEntity.ok(
            Map.of("message", "Account verified successfully")
        );
    }
}