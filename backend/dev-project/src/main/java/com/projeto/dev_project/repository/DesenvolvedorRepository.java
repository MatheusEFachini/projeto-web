package com.projeto.dev_project.repository;

import com.projeto.dev_project.entity.Desenvolvedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesenvolvedorRepository extends JpaRepository<Desenvolvedor, Integer> {
}
