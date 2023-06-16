package com.example.backend.controllers.responses;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public record UserResponse(
        Long id,
        String username,
        String name,
        String ci,
        Boolean availability,
        Collection<? extends GrantedAuthority>authorities
) {
}
