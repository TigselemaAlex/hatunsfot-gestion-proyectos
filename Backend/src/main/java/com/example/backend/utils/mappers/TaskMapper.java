package com.example.backend.utils.mappers;

import com.example.backend.controllers.requests.TaskRequest;
import com.example.backend.controllers.responses.TaskResponse;
import com.example.backend.controllers.responses.TaskResponseWithUsers;
import com.example.backend.entities.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    TaskResponse taskResponseFromTask(Task task);

    Task taskFromTaskRequest(TaskRequest taskRequest);

    @Mapping(target = "users", ignore = true)
    TaskResponseWithUsers taskResponseWithUsers(Task task);
}
