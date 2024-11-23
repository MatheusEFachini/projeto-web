package com.projeto.dev_project.repository;

import com.projeto.dev_project.entity.Nivel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NivelRepository extends JpaRepository<Nivel, Integer> {
}
