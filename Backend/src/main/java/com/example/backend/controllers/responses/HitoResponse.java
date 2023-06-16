package com.example.backend.controllers.responses;

import java.time.LocalDate;

public record HitoResponse(
        Long id,
        LocalDate endDate) {
}
