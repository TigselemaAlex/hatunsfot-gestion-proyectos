package com.example.backend.controllers.responses;

import com.example.backend.utils.enums.TaskStatus;

import java.time.LocalDate;

public record TaskResponse(Long id, String name, String description, LocalDate startDate, LocalDate endDate,
                           Integer percentage, TaskStatus status) {
}
