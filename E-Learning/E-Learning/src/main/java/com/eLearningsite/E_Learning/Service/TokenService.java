package com.eLearningsite.E_Learning.Service;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class TokenService {

    private final String SECRET = "YourSuperSecretKeyChangeThisToAtLeast32Characters";
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    // ✅ Generate JWT
    public String generateToken(String userName) {
        return Jwts.builder()
                .setSubject(userName)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256) // ✅ correct usage
                .compact();
    }

    // ✅ Validate and extract username
    public String validateTokenAndGetUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // ✅ correct usage
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ Token validity check
    public boolean isValidToken(String username, String token) {
        try {
            String tokenUsername = validateTokenAndGetUsername(token);
            return tokenUsername.equals(username);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
