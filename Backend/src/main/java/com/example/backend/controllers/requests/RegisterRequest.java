package com.example.backend.controllers.requests;

public record RegisterRequest(String username,
                              String password,
                              String name,
                              String ci) {
}
