package com.example.backend.utils.mappers;

import com.example.backend.controllers.requests.ProjectRequest;
import com.example.backend.controllers.responses.ProjectResponse;
import com.example.backend.controllers.responses.ProjectResponseWithTasksAndUsers;
import com.example.backend.entities.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    Project projectFromProjectRequest(ProjectRequest projectRequest);
    @Mapping(target = "task_quantity", ignore = true)
    ProjectResponse projectResponseFromProject(Project project);

    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "users", ignore = true)
    ProjectResponseWithTasksAndUsers projectResponseWithTAndU(Project project);
}
