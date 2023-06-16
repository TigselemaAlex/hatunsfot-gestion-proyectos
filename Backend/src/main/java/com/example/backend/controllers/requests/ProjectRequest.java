package com.example.backend.controllers.requests;

import java.time.LocalDate;

public record ProjectRequest(
        String name,
        String description,
        LocalDate startDate,
        LocalDate endDate
) {
}
