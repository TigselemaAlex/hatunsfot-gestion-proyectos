package com.example.backend.entities;

import com.example.backend.utils.enums.TaskStatus;
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
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer percentage;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    @ManyToOne
    private Project project;
    @ManyToOne
    private Hito hito;
    @ManyToMany (mappedBy = "tasks")
    private Set<User> users = new HashSet<>();
}
