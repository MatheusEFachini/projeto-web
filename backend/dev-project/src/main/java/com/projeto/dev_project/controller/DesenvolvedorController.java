package com.projeto.dev_project.controller;

import com.projeto.dev_project.entity.Desenvolvedor;
import com.projeto.dev_project.repository.DesenvolvedorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/desenvolvedores")
public class DesenvolvedorController {

    @Autowired
    DesenvolvedorRepository desenvolvedorRepository;

    @GetMapping
    public ResponseEntity<List<Desenvolvedor>> getDesenvolvedores() {
        try{
            List<Desenvolvedor> desenvolvedores = desenvolvedorRepository.findAll();
            if(Objects.isNull(desenvolvedores) || desenvolvedores.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(desenvolvedores, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Desenvolvedor> saveDev(@RequestBody Desenvolvedor dev) {
        try{
            Desenvolvedor devSaved = desenvolvedorRepository.save(dev);
            return new ResponseEntity<>(devSaved, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Desenvolvedor> editDev(@PathVariable(value = "id") Integer id,@RequestBody Desenvolvedor dev) {
        try{
            dev.setId(id);
            Desenvolvedor devSaved = desenvolvedorRepository.save(dev);
            return new ResponseEntity<>(devSaved, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable(value = "id") Integer id){
        try{
            desenvolvedorRepository.deleteById(id);
            return new ResponseEntity<>(String.format("Desenvolvedor com id: %d excluído", id), HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
