package com.eLearningsite.E_Learning.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "enrollment_details")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // recommended
    private StudentDetails user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private CourseDetails course;

    public Enrollment() {}

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StudentDetails getUser() {
        return user;
    }

    public void setUser(StudentDetails user) {
        this.user = user;
    }

    public CourseDetails getCourse() {
        return course;
    }

    public void setCourse(CourseDetails course) {
        this.course = course;
    }
}
