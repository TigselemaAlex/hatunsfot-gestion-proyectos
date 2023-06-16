package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    @OneToMany(mappedBy = "project", orphanRemoval = true)
    private Set<Task> tasks = new HashSet<>();;
    @ManyToMany(mappedBy = "projects")
    private Set<User> users = new HashSet<>();
}
