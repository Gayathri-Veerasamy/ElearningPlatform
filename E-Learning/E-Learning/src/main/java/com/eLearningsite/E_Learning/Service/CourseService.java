package com.eLearningsite.E_Learning.Service;

import com.eLearningsite.E_Learning.Entity.CourseDetails;
import com.eLearningsite.E_Learning.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Save new course
    public CourseDetails saveCourse(CourseDetails courseDetails) {
        return courseRepository.save(courseDetails);
    }

    // Update existing course by ID

        public CourseDetails updateCourse (Integer id, CourseDetails updatedCourse){
            CourseDetails existing = courseRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

            existing.setCourseName(updatedCourse.getCourseName());
            existing.setCourseInstructor(updatedCourse.getCourseInstructor());
            existing.setCourseImage(updatedCourse.getCourseImage());
            existing.setCourseDuration(updatedCourse.getCourseDuration());
            existing.setNoOfEnrolments(updatedCourse.getNoOfEnrolments());
            existing.setContents(updatedCourse.getContents());
            existing.setQuizzes(updatedCourse.getQuizzes());

            return courseRepository.save(existing);
        }



    // Get all courses
    public List<CourseDetails> getAllCourses() {
        return courseRepository.findAll();
    }

    // Delete by ID
    public void deleteCourseById(Integer id) {
        courseRepository.deleteById(id);
    }

    // Find courses by name (partial match)
    public List<CourseDetails> findByCourseNameContaining(String name) {
        return courseRepository.findByCourseNameContainingIgnoreCase(name);
    }
}
