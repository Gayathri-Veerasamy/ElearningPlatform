package com.eLearningsite.E_Learning.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "course_contents")
public class ContentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;
    @ManyToOne
    @JoinColumn(name = "course_id") // ✅ matches primary key column

    @JsonBackReference
    private CourseDetails course;


    public ContentDetails() {}

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public CourseDetails getCourse() {
        return course;
    }

    public void setCourse(CourseDetails course) {
        this.course = course;
    }
}
