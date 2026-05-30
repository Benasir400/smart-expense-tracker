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

@RestController

@RequestMapping("/auth")

@CrossOrigin("*")

public class AuthController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    // Register API
    @PostMapping("/register")

    public String register(
            @RequestBody RegisterRequest request
    ) {

        Optional<User> existingUser =

                repository.findByEmail(
                        request.getEmail()
                );

        if (existingUser.isPresent()) {

            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                encoder.encode(
                        request.getPassword()
                )
        );

        repository.save(user);

        return "User Registered Successfully";
    }

    // Login API
    @PostMapping("/login")

    public Map<String, String> login(
            @RequestBody LoginRequest request
    ) {

        Optional<User> user =

                repository.findByEmail(
                        request.getEmail()
                );

        Map<String, String> response =
                new HashMap<>();

        if (
                user.isPresent()
                        &&
                        encoder.matches(
                                request.getPassword(),
                                user.get().getPassword()
                        )
        ) {

            String token =
                    jwtUtil.generateToken(
                            request.getEmail()
                    );

            response.put("token", token);

            return response;
        }

        response.put(
                "message",
                "Invalid Credentials"
        );

        return response;
    }
}
