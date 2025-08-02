package com.eLearningsite.E_Learning.Repository;

import com.eLearningsite.E_Learning.Entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentDetails, Integer> {
    Optional<StudentDetails> findByUserName(String userName); // ✅ Use Optional to prevent null issues
}
