package com.eduforge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String to, String otp) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("harsvko@gmail.com");
        msg.setTo(to);
        msg.setSubject("EduForge Email Verification");
        msg.setText("Your OTP is: " + otp);

        mailSender.send(msg);
    }
}