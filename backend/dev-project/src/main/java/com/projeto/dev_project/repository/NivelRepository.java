package com.projeto.dev_project.repository;

import com.projeto.dev_project.DTO.NivelDTO;
import com.projeto.dev_project.entity.Nivel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NivelRepository extends JpaRepository<Nivel, Integer> {

    @Query(name = "find_niveldto", nativeQuery = true)
    List<NivelDTO> findNiveisWithQuantidadeDesenvolvedores();

}
