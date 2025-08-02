package com.eLearningsite.E_Learning.Service;

import com.eLearningsite.E_Learning.Entity.Enrollment;
import com.eLearningsite.E_Learning.Entity.StudentDetails;
import com.eLearningsite.E_Learning.Entity.CourseDetails;
import com.eLearningsite.E_Learning.Repository.CourseRepository;
import com.eLearningsite.E_Learning.Repository.EnrollmentRepository;
import com.eLearningsite.E_Learning.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByUser(StudentDetails user) {
        return enrollmentRepository.findByUser(user);
    }

    public boolean enrollStudent(Integer userId, Integer courseId) {
        System.out.println("Attempting to enroll userId: " + userId + " into courseId: " + courseId);

        Optional<StudentDetails> studentOpt = studentRepository.findById(userId);
        Optional<CourseDetails> courseOpt = courseRepository.findById(courseId);

        if (studentOpt.isEmpty()) {
            System.err.println("Student not found with ID: " + userId);
            throw new RuntimeException("Student not found");
        }

        if (courseOpt.isEmpty()) {
            System.err.println("Course not found with ID: " + courseId);
            throw new RuntimeException("Course not found");
        }

        StudentDetails student = studentOpt.get();
        CourseDetails course = courseOpt.get();

        // Check if already enrolled
        List<Enrollment> existing = enrollmentRepository.findByUserAndCourse(student, course);
        if (!existing.isEmpty()) {
            System.out.println("User already enrolled.");
            return false;
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(student);
        enrollment.setCourse(course);

        enrollmentRepository.save(enrollment);
        System.out.println("Enrollment successful.");
        return true;
    }
}
