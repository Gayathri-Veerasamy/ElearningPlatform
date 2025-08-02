package com.eLearningsite.E_Learning.Repository;

import com.eLearningsite.E_Learning.Entity.CourseDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<CourseDetails, Integer> {
    List<CourseDetails> findByCourseNameContainingIgnoreCase(String name);
}
