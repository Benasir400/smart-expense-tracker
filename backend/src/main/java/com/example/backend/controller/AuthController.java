package com.example.backend.controller;

import com.example.backend.config.JwtUtil;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import com.example.backend.dto.ForgotPasswordRequest;
import com.example.backend.dto.VerifyOtpRequest;
import com.example.backend.dto.ResetPasswordRequest;
import com.example.backend.service.EmailService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ✅ REGISTER
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        Optional<User> existingUser = repository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists";
        }
        if (request.getPhone() == null || request.getPhone().length() != 10) {
            return "Phone number must be 10 digits";
        }
        if (!request.getEmail().contains("@")) {
            return "Invalid Email";
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone()); // ✅ ADDED
        user.setPassword(encoder.encode(request.getPassword()));

        repository.save(user);

        return "User Registered Successfully";
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {

        Optional<User> user = repository.findByEmail(request.getEmail());

        Map<String, Object> response = new HashMap<>();

        if (user.isPresent() &&
                encoder.matches(request.getPassword(), user.get().getPassword())) {

            String token = jwtUtil.generateToken(request.getEmail());

            response.put("token", token);

            // ✅ SEND USER DATA
            response.put("name", user.get().getName());
            response.put("email", user.get().getEmail());
            response.put("phone", user.get().getPhone());

            return response;
        }

        response.put("message", "Invalid Credentials");
        return response;
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "Email not found";
        }

        String otp = String.valueOf(
                (int) (100000 + Math.random() * 900000));

        user.setOtp(otp);

        user.setOtpExpiryTime(
                System.currentTimeMillis() + 300000);

        user.setOtpVerified(false);

        repository.save(user);

        emailService.sendOtp(
                request.getEmail(),
                otp);

        return "OTP Sent Successfully";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        User user = repository.findByEmail(
                request.getEmail()).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!request.getOtp().equals(user.getOtp())) {
            return "Invalid OTP";
        }

        if (System.currentTimeMillis() > user.getOtpExpiryTime()) {

            return "OTP Expired";
        }

        user.setOtpVerified(true);

        repository.save(user);

        return "OTP Verified Successfully";
    }

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request) {

        User user = repository.findByEmail(
                request.getEmail()).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!Boolean.TRUE.equals(
                user.getOtpVerified())) {

            return "Verify OTP First";
        }

        user.setPassword(
                encoder.encode(
                        request.getNewPassword()));

        user.setOtp(null);
        user.setOtpExpiryTime(null);
        user.setOtpVerified(false);

        repository.save(user);

        return "Password Reset Successfully";
    }

    // @PostMapping("/test-mail")
    // public String testMail() {
    //     emailService.sendOtp("your_email@gmail.com", "123456");
    //     return "Mail Sent";
    // }
}