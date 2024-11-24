package com.projeto.dev_project.controller;

import com.projeto.dev_project.entity.Nivel;
import com.projeto.dev_project.repository.NivelRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/niveis")
public class NivelController {

    @Autowired
    NivelRepository nivelRepository;

    @GetMapping
    public ResponseEntity<List<Nivel>> getNiveis() {
        try{
            List<Nivel> niveis = nivelRepository.findAll();
            if(Objects.isNull(niveis) || niveis.size() < 1){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(niveis, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Nivel> saveNivel(@RequestBody @Valid Nivel nivel) {
        try{
            Nivel nivelSaved = nivelRepository.save(nivel);
            return new ResponseEntity<>(nivelSaved, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nivel> editNivel(@PathVariable(value = "id") Integer id,@RequestBody @Valid Nivel nivel) {
        try{
            nivel.setId(id);
            Nivel nivelSaved = nivelRepository.save(nivel);
            return new ResponseEntity<>(nivelSaved, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable(value = "id") Integer id){
        try{
            nivelRepository.deleteById(id);
            return new ResponseEntity<>(String.format("Nivel %d excluído", id), HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
