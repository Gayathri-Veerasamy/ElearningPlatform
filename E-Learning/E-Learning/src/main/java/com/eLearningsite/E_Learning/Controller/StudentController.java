package com.eLearningsite.E_Learning.Controller;

import com.eLearningsite.E_Learning.Dto.AuthResponse;
import com.eLearningsite.E_Learning.Entity.StudentDetails;
import com.eLearningsite.E_Learning.Repository.StudentRepository;
import com.eLearningsite.E_Learning.Service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/elearn")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TokenService studentService;

    // ✅ LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody StudentDetails credentials) {
        Optional<StudentDetails> userOptional = studentRepository.findByUserName(credentials.getUserName());

        if (userOptional.isPresent()) {
            StudentDetails user = userOptional.get();

            if (user.getPassword().equals(credentials.getPassword())) {
                String token = studentService.generateToken(user.getUserName());
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new AuthResponse(user.getId(), user.getUserName(), token));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // ✅ SIGNUP ENDPOINT
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody StudentDetails newUser) {
        Optional<StudentDetails> existingUser = studentRepository.findByUserName(newUser.getUserName());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        studentRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("Signup successful");
    }

    // ✅ UPDATE USER PROFILE (username, email, password)
    @PutMapping("/users/update/{userId}")
    public ResponseEntity<?> updateUser(
            @PathVariable Integer userId,
            @RequestBody StudentDetails updatedData,
            @RequestHeader("Authorization") String token
    ) {
        // Basic token validation
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }

        Optional<StudentDetails> existingUser = studentRepository.findById(userId);

        if (existingUser.isPresent()) {
            StudentDetails user = existingUser.get();

            // Update only if not null
            if (updatedData.getUserName() != null) {
                user.setUserName(updatedData.getUserName());
            }

            if (updatedData.getEmail() != null) {
                user.setEmail(updatedData.getEmail());
            }

            if (updatedData.getPassword() != null && !updatedData.getPassword().isBlank()) {
                user.setPassword(updatedData.getPassword());
            }

            studentRepository.save(user);

            return ResponseEntity.ok("User updated successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
