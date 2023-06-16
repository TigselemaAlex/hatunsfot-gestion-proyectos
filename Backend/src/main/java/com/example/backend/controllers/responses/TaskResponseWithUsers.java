package com.example.backend.controllers.responses;

import com.example.backend.utils.enums.TaskStatus;

import java.time.LocalDate;
import java.util.Set;

public record TaskResponseWithUsers(Long id, String name, String description, LocalDate startDate, LocalDate endDate,
                                    Integer percentage, TaskStatus status, Set<UserInfoResponse> users) {
    public TaskResponseWithUsers addUsers(Set<UserInfoResponse> users){
        return new TaskResponseWithUsers(this.id(), this.name(), this.description(), this.startDate(), this.endDate(), this.percentage(),this.status() ,users);
    }
}
