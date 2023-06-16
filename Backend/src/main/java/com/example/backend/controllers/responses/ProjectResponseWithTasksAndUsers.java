package com.example.backend.controllers.responses;

import java.time.LocalDate;
import java.util.Set;

public record ProjectResponseWithTasksAndUsers(
        Long id,
        String name,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Set<TaskResponse> tasks,
        Set<UserResponse> users
) {
    public ProjectResponseWithTasksAndUsers addTaskAndUsers(Set<TaskResponse> tasks,Set<UserResponse> users ){
        return new ProjectResponseWithTasksAndUsers(this.id, this.name, this.description, this.startDate, this.endDate, tasks, users);
    }
}
