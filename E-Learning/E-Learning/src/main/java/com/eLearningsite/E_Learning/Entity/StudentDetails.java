package com.eLearningsite.E_Learning.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_details")
public class StudentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(unique = true, nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String email;

    public StudentDetails() {}

    public StudentDetails(String userName, String password, String email) {
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

    // Getters and setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId() {
        return this.userId;
    }
}
