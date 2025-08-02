package com.eLearningsite.E_Learning.Auth;

import com.eLearningsite.E_Learning.Service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component // ✅ This makes it a Spring-managed bean
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true; // allow preflight to pass through
        }

        // your JWT validation logic here...
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // remove "Bearer " prefix
            String username = tokenService.validateTokenAndGetUsername(token);
            if (username != null) {
                return true;
            }
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return false;
    }


}
