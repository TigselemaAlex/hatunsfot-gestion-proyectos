package com.example.backend.repositories;

import com.example.backend.entities.Hito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HitoRepository extends JpaRepository<Hito, Long> {
}
