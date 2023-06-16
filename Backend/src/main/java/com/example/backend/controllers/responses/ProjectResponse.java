package com.example.backend.controllers.responses;

import lombok.Setter;

import java.time.LocalDate;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Integer task_quantity) {
    public ProjectResponse withTaskQuantity(Integer taskQuantity){
        return new ProjectResponse(this.id, this.name, this.description, this.startDate, this.endDate, taskQuantity);
    }
}
