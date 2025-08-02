package com.eLearningsite.E_Learning.Controller;

import com.eLearningsite.E_Learning.Entity.CourseDetails;
import com.eLearningsite.E_Learning.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/elearn/courses")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class CourseController {

    @Autowired
    private CourseService courseService;

    // ✅ Add a new course
    @PostMapping("/add")
    public ResponseEntity<?> addCourse(@RequestBody CourseDetails courseDetails) {
        try {
            CourseDetails savedCourse = courseService.saveCourse(courseDetails);
            return ResponseEntity.ok(savedCourse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    // ✅ Edit (Update) existing course
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Integer id, @RequestBody CourseDetails updatedCourse) {
        try {
            CourseDetails result = courseService.updateCourse(id, updatedCourse);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Update failed: " + e.getMessage());
        }
    }

    // ✅ Delete course by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourseById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCourses() {
        try {
            List<CourseDetails> courses = courseService.getAllCourses();
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            e.printStackTrace(); // This will show in backend logs
            return ResponseEntity.status(500).body("Error fetching courses: " + e.getMessage());
        }
    }


    // ✅ Find courses by name (partial match)
    @GetMapping("/search")
    public ResponseEntity<List<CourseDetails>> findByCourseName(@RequestParam("name") String name) {
        List<CourseDetails> courses = courseService.findByCourseNameContaining(name);
        return ResponseEntity.ok(courses);
    }
}
