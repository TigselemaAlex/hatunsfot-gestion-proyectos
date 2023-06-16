package com.example.backend.controllers.requests;

import java.time.LocalDate;

public record TaskRequest(String name, String description, LocalDate startDate, LocalDate endDate,
                          Integer percentage) {
}
