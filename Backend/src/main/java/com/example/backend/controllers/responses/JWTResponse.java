package com.example.backend.controllers.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTResponse {
    private String token;
    private final String TOKEN_HEADER = "Bearer";
    private UserResponse user;
}
