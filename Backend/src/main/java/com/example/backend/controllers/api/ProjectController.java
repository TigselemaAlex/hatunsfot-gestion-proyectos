package com.example.backend.controllers.api;

import com.example.backend.controllers.requests.ProjectRequest;
import com.example.backend.controllers.responses.ProjectResponse;
import com.example.backend.controllers.responses.ProjectResponseWithTasksAndUsers;
import com.example.backend.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "protected/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping(value = "/{userId}")
    public ResponseEntity<ProjectResponse> save(@PathVariable final Long userId,@RequestBody final ProjectRequest projectRequest){
        return ResponseEntity.ok(projectService.save(projectRequest, userId));
    }
    @GetMapping(value = "/{userId}")
    public ResponseEntity<List<ProjectResponse>> findAll(@PathVariable final Long userId){
        return ResponseEntity.ok(projectService.findAll(userId));
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ProjectResponseWithTasksAndUsers> findById(@PathVariable final Long id){
        return ResponseEntity.ok(projectService.findById(id));
    }

}
