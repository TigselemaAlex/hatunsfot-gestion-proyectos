package com.example.backend.entities;

import com.example.backend.utils.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
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
    @OneToMany (mappedBy = "task")
    private Set<User> users;
}
