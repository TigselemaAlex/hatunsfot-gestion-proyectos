package com.example.backend.entities;

import com.example.backend.utils.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private String ci;
    private Boolean availability;
    @Enumerated(EnumType.STRING)
    private Role role;
    @ManyToOne
    private Project project;
    @ManyToOne
    private Task task;

    @PrePersist
    public void prePersist(){
        availability = true;
    }


}
