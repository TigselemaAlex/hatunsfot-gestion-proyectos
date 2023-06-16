package com.example.backend.repositories;

import com.example.backend.entities.Project;
import com.example.backend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Set<Task> findByProject(Project project);
}
