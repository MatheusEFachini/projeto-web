package com.projeto.dev_project.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projeto.dev_project.entity.Nivel;
import com.projeto.dev_project.repository.NivelRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestPropertySource("classpath:application-test.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class NivelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private NivelRepository nivelRepository;


    @Test
    void getNiveis() throws Exception {
        mockMvc
                .perform(MockMvcRequestBuilders.get("/api/niveis"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.*").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.*", Matchers.hasSize(4)));
    }

    @Test
    void saveNivel() throws Exception {
        Nivel nivel = new Nivel();
        nivel.setNivel("Novo Nivel");

        assertFalse(nivelRepository.existsById(99));

        mockMvc
                .perform(MockMvcRequestBuilders.post("/api/niveis")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nivel)))
                .andExpect(MockMvcResultMatchers.status().isCreated());
        assertTrue(nivelRepository.existsById(99));
    }

    @Test
    void editNivel() throws Exception {
        Nivel nivel = new Nivel();
        nivel.setId(1);
        nivel.setNivel("Nivel Editado");

        Optional<Nivel> nivelExistente = nivelRepository.findById(1);
        assertEquals(nivelExistente.get().getNivel(),"Trainee");

        mockMvc
                .perform(MockMvcRequestBuilders.put("/api/niveis/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nivel)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Optional<Nivel> nivelEditado = nivelRepository.findById(1);
        assertEquals(nivelEditado.get().getNivel(),"Nivel Editado");
    }

    @Test
    void deleteNivel() throws Exception {

        assertTrue(nivelRepository.existsById(4));

        mockMvc
                .perform(MockMvcRequestBuilders.delete("/api/niveis/4"))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        assertFalse(nivelRepository.existsById(4));
    }
}