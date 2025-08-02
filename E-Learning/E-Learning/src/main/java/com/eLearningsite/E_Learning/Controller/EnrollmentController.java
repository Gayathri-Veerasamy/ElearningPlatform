package com.eLearningsite.E_Learning.Controller;

import com.eLearningsite.E_Learning.Entity.CourseDetails;
import com.eLearningsite.E_Learning.Entity.Enrollment;
import com.eLearningsite.E_Learning.Entity.StudentDetails;
import com.eLearningsite.E_Learning.Repository.CourseRepository;
import com.eLearningsite.E_Learning.Repository.EnrollmentRepository;
import com.eLearningsite.E_Learning.Repository.StudentRepository;
import com.eLearningsite.E_Learning.Service.EnrollmentService;
import com.eLearningsite.E_Learning.Service.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/elearn/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    // ✅ Get all available courses
    @GetMapping("/all")
    public List<CourseDetails> getAllCourses() {
        return courseRepository.findAll();
    }

    // ✅ Enroll in a course
    @PostMapping("/enroll")
    public String enrollStudent(@RequestParam Integer courseId,
                                @RequestHeader("Authorization") String token,
                                @RequestHeader("username") String username) {
        try {
            System.out.println("Enrollment request - username: " + username + ", token: " + token);

            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Remove 'Bearer ' prefix
            }

            if (token == null || username == null || !tokenService.isValidToken(username, token)) {
                System.err.println("Invalid or missing token for username: " + username);
                return "Invalid or missing token";
            }

            Optional<StudentDetails> userOptional = studentRepository.findByUserName(username);
            if (userOptional.isEmpty()) {
                System.err.println("User not found with username: " + username);
                return "User not found";
            }

            StudentDetails user = userOptional.get();

            boolean enrolled = enrollmentService.enrollStudent(user.getUserId(), courseId);
            return enrolled ? "Enrollment successful" : "User already enrolled in this course";

        } catch (Exception e) {
            e.printStackTrace();
            return "Internal server error: " + e.getMessage();
        }
    }

    // ✅ Get enrolled courses for a student (via userId path param)
    @GetMapping("/my-courses/{userId}")
    public List<CourseDetails> getMyCourses(@PathVariable Integer userId) {
        try {
            Optional<StudentDetails> studentOpt = studentRepository.findById(userId);
            if (studentOpt.isEmpty()) {
                throw new RuntimeException("Student not found");
            }

            StudentDetails student = studentOpt.get();
            List<Enrollment> enrollments = enrollmentRepository.findByUser(student);
            return enrollments.stream().map(Enrollment::getCourse).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get enrolled courses: " + e.getMessage());
        }
    }
}
