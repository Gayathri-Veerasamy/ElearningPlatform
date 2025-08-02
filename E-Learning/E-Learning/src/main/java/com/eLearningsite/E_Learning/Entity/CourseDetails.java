package com.eLearningsite.E_Learning.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "course_details")
public class CourseDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id") // Fix added
    private Integer courseId;


    private String courseName;
    private String courseInstructor;
    private int courseDuration;
    private String courseImage;
    private int noOfEnrolments;

    // In CourseDetails.java
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ContentDetails> contents;



    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quizzz> quizzes;




    public CourseDetails() {}

    // Getters and Setters
    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseInstructor() {
        return courseInstructor;
    }

    public void setCourseInstructor(String courseInstructor) {
        this.courseInstructor = courseInstructor;
    }

    public int getCourseDuration() {
        return courseDuration;
    }

    public void setCourseDuration(int courseDuration) {
        this.courseDuration = courseDuration;
    }

    public String getCourseImage() {
        return courseImage;
    }

    public void setCourseImage(String courseImage) {
        this.courseImage = courseImage;
    }

    public int getNoOfEnrolments() {
        return noOfEnrolments;
    }

    public void setNoOfEnrolments(int noOfEnrolments) {
        this.noOfEnrolments = noOfEnrolments;
    }

    public List<ContentDetails> getContents() {
        return contents;
    }

    public void setContents(List<ContentDetails> contents) {
        this.contents = contents;
    }

    public List<Quizzz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<Quizzz> quizzes) {
        this.quizzes = quizzes;
    }
}
