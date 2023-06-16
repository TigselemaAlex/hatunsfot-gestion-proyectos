package com.example.backend.controllers.api;

import com.example.backend.controllers.requests.TaskRequest;
import com.example.backend.controllers.requests.UserOfTaskRequest;
import com.example.backend.controllers.responses.TaskResponse;
import com.example.backend.controllers.responses.TaskResponseWithUsers;
import com.example.backend.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/protected/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping(value = "/{proyectId}")
    public ResponseEntity<TaskResponse> save(@PathVariable final Long proyectId, @RequestBody final TaskRequest request){
        return ResponseEntity.ok(taskService.save(proyectId, request));
    }

    @GetMapping(value = "/{proyectId}")
    public ResponseEntity<Set<TaskResponse>> findAll(@PathVariable final Long proyectId){
        return ResponseEntity.ok(taskService.findAll(proyectId));
    }

    @PostMapping(value = "/users/{taskId}")
    public ResponseEntity<TaskResponseWithUsers> addUsers (@RequestBody final List<UserOfTaskRequest> requests,@PathVariable Long  taskId ){
        return ResponseEntity.ok(taskService.addUsers(requests, taskId));
    }

}
