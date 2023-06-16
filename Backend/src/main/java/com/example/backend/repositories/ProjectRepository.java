package com.example.backend.repositories;

import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select p from Project p join p.users u where u = ?1")
    List<Project> findyByUser(User user);
}
