package com.example.backend.controllers.responses;

public record UserInfoResponse(
        Long id,
        String username,
        String name,
        String ci,
        Boolean availability) {
}
