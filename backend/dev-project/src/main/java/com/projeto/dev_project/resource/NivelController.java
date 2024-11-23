package com.projeto.dev_project.resource;

import com.projeto.dev_project.entity.Nivel;
import com.projeto.dev_project.repository.NivelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/niveis")
public class NivelController {

    @Autowired
    NivelRepository nivelRepository;

    @GetMapping
    public List<Nivel> getNiveis() {
        return nivelRepository.findAll();
    }

    @PostMapping
    public Nivel saveNivel(@RequestBody Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    @PutMapping("/{id}")
    public Nivel editNivel(@RequestBody Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(value = "id") Integer id){
        nivelRepository.deleteById(id);
    }

}
