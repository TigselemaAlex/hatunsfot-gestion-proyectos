package com.example.backend.services;

import com.example.backend.controllers.requests.ProjectRequest;
import com.example.backend.controllers.responses.ProjectResponse;
import com.example.backend.controllers.responses.ProjectResponseWithTasksAndUsers;
import com.example.backend.controllers.responses.TaskResponse;
import com.example.backend.controllers.responses.UserResponse;
import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import com.example.backend.repositories.ProjectRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.mappers.ProjectMapper;
import com.example.backend.utils.mappers.TaskMapper;
import com.example.backend.utils.mappers.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public ProjectResponse save(ProjectRequest request, Long userId){
        Project project = ProjectMapper.INSTANCE.projectFromProjectRequest(request);
        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        project.getUsers().add(user);
        user.getProjects().add(project);
        return ProjectMapper.INSTANCE.projectResponseFromProject(projectRepository.save(project));
    }

    public List<ProjectResponse> findAll(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        List <Project> projects = projectRepository.findyByUser(user);
        List<ProjectResponse> response = projects.stream().map(
                project -> {
                    ProjectResponse pR = ProjectMapper.INSTANCE.projectResponseFromProject(project);
                    pR = pR.withTaskQuantity(project.getTasks().size());
                    return pR;
                }
        ).toList();
        return response;
    }

    public ProjectResponseWithTasksAndUsers findById(Long id){
        Project project = projectRepository.findById(id).orElseThrow(()-> new RuntimeException("Projecto no encontrado"));
        ProjectResponseWithTasksAndUsers response = ProjectMapper.INSTANCE.projectResponseWithTAndU(project);
        Set<TaskResponse> taskResponse = new HashSet<>(project.getTasks().stream().map(TaskMapper.INSTANCE::taskResponseFromTask).toList());
        Set<UserResponse> userResponses = new HashSet<>(
                project.getUsers().stream().map(UserMapper.INSTANCE::userResponseFromUser).toList()
        );
        response = response.addTaskAndUsers(taskResponse, userResponses);
        return response;

    }


}
