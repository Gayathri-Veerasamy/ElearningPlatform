package com.eLearningsite.E_Learning.Dto;

public class AuthResponse {
    private Integer userId;
    private String userName;
    private String token;

    public AuthResponse(Integer userId, String userName, String token) {
        this.userId = userId;
        this.userName = userName;
        this.token = token;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getToken() {
        return token;
    }
}
