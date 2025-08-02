package com.eLearningsite.E_Learning.Repository;


import com.eLearningsite.E_Learning.Entity.Enrollment;
import com.eLearningsite.E_Learning.Entity.StudentDetails;
import com.eLearningsite.E_Learning.Entity.CourseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findByUser(StudentDetails user);
    List<Enrollment> findByCourse(CourseDetails course);
    boolean existsByUserAndCourse(StudentDetails user, CourseDetails course);

    List<Enrollment> findByUserAndCourse(StudentDetails student, CourseDetails course);
}

