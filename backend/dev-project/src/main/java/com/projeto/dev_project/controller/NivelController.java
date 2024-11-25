package com.projeto.dev_project.controller;

import com.projeto.dev_project.DTO.NivelDTO;
import com.projeto.dev_project.entity.Nivel;
import com.projeto.dev_project.exceptions.ApplicationGlobalException;
import com.projeto.dev_project.exceptions.CustomException;
import com.projeto.dev_project.repository.NivelRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/niveis")
public class NivelController {

    @Autowired
    private NivelRepository nivelRepository;

    @GetMapping
    public ResponseEntity<List<NivelDTO>> getNiveis() {
        try{
            List<NivelDTO> niveis = nivelRepository.findNiveisWithQuantidadeDesenvolvedores();
            if(Objects.isNull(niveis) || niveis.isEmpty()){
                throw new ApplicationGlobalException(new CustomException(HttpStatus.NOT_FOUND.value(), "Tabela vazia","Nenhuma entidade encontrada"));
            }
            return new ResponseEntity<>(niveis, HttpStatus.OK);
        } catch (Exception e){
            throw new ApplicationGlobalException(new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(),"Erro ao buscar entidades"));
        }
    }

    @PostMapping
    public ResponseEntity<Nivel> saveNivel(@RequestBody @Valid Nivel nivel) {
        try{
            Nivel nivelSaved = nivelRepository.save(nivel);
            return new ResponseEntity<>(nivelSaved, HttpStatus.CREATED);
        }catch (Exception e){
            throw new ApplicationGlobalException(new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(),"Erro ao salvar entidade"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nivel> editNivel(@PathVariable(value = "id") Integer id,@RequestBody @Valid Nivel nivel) {
        try{
            nivel.setId(id);
            Nivel nivelSaved = nivelRepository.save(nivel);
            return new ResponseEntity<>(nivelSaved, HttpStatus.OK);
        }catch (Exception e){
            throw new ApplicationGlobalException(new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(),"Erro ao salvar entidade"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable(value = "id") Integer id) {
        try{
            nivelRepository.deleteById(id);
            return new ResponseEntity<>(String.format("Nivel %d excluído", id), HttpStatus.NO_CONTENT);
        }catch (DataIntegrityViolationException e){
            throw new ApplicationGlobalException(new CustomException(HttpStatus.BAD_REQUEST.value(), e.getMessage(),"Existe uma entidade vinculada á essa"));
        } catch (Exception e){
            throw new ApplicationGlobalException(new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(),"Erro ao excluir entidade"));
        }
    }

}
