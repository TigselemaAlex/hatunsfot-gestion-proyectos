package com.example.backend.services;

import com.example.backend.controllers.requests.TaskRequest;
import com.example.backend.controllers.requests.UserOfTaskRequest;
import com.example.backend.controllers.responses.TaskResponse;
import com.example.backend.controllers.responses.TaskResponseWithUsers;
import com.example.backend.controllers.responses.UserResponse;
import com.example.backend.entities.Project;
import com.example.backend.entities.Task;
import com.example.backend.entities.User;
import com.example.backend.repositories.ProjectRepository;
import com.example.backend.repositories.TaskRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.enums.TaskStatus;
import com.example.backend.utils.mappers.TaskMapper;
import com.example.backend.utils.mappers.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse save(Long proyectId, TaskRequest request){
        Project project = projectRepository.findById(proyectId).orElseThrow(()-> new RuntimeException("El proyecto no existe"));
        Task task = TaskMapper.INSTANCE.taskFromTaskRequest(request);
        task.setStatus(TaskStatus.PENDING);
        task.setProject(project);
        return TaskMapper.INSTANCE.taskResponseFromTask(taskRepository.save(task));
    }
    public Set<TaskResponse> findAll(Long proyectId){
        Project project = projectRepository.findById(proyectId).orElseThrow(()-> new RuntimeException("El proyecto no existe"));
        Set<Task> tasks = taskRepository.findByProject(project);
        return new HashSet<>(tasks.stream().map(TaskMapper.INSTANCE::taskResponseFromTask).toList());
    }

    public TaskResponseWithUsers addUsers(List<UserOfTaskRequest> requests, Long  id){
        Task task = taskRepository.findById(id).orElseThrow(()-> new RuntimeException("La tarea no existe"));

        Set<User> users =
                requests.stream().map(
                        r -> {
                            User user = userRepository.findById(r.id()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                            user.getTasks().add(task);
                            return user;
                        }
                ).collect(Collectors.toSet());

        task.setUsers(
                users
        );
        TaskResponseWithUsers taskResponse = TaskMapper.INSTANCE.taskResponseWithUsers(taskRepository.save(task));
        taskResponse = taskResponse.addUsers(users.stream().map(UserMapper.INSTANCE::userInfoFromUser).collect(Collectors.toSet()));
        return taskResponse;

    }
}
