package com.projeto.dev_project.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projeto.dev_project.entity.Desenvolvedor;
import com.projeto.dev_project.repository.DesenvolvedorRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Order;
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

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestPropertySource("classpath:application-test.properties")
class DesenvolvedorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DesenvolvedorRepository desenvolvedorRepository;

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.BEFORE_METHOD)
    @Order(1)
    void getDesenvolvedores() throws Exception {
        mockMvc
                .perform(MockMvcRequestBuilders.get("/api/desenvolvedores"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.*").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.*", Matchers.hasSize(3)));
    }

    @Test
    @Order(2)
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void saveDesenvolvedor() throws Exception {
        Desenvolvedor dev = new Desenvolvedor();
        dev.setNome("TESTE");
        dev.setSexo("M");
        dev.setData_nascimento(LocalDate.now().minusDays(15));
        dev.setHobby("HOBBY");

        assertFalse(desenvolvedorRepository.existsById(99));

        mockMvc
                .perform(MockMvcRequestBuilders.post("/api/desenvolvedores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dev)))
                .andExpect(MockMvcResultMatchers.status().isCreated());
        assertTrue(desenvolvedorRepository.existsById(99));
    }

    @Test
    void editDesenvolvedor() throws Exception {
        Desenvolvedor dev = new Desenvolvedor();
        dev.setId(1);
        dev.setNome("TESTE");
        dev.setSexo("M");
        dev.setData_nascimento(LocalDate.now().minusDays(15));
        dev.setHobby("HOBBY");

        Optional<Desenvolvedor> devExistente = desenvolvedorRepository.findById(1);
        assertEquals(devExistente.get().getNome(),"Marcos");

        mockMvc
                .perform(MockMvcRequestBuilders.put("/api/desenvolvedores/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dev)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Optional<Desenvolvedor> devEditado = desenvolvedorRepository.findById(1);
        assertEquals(devEditado.get().getNome(),"TESTE");
    }

    @Test
    void deleteDev() throws Exception {

        assertTrue(desenvolvedorRepository.existsById(2));

        mockMvc
                .perform(MockMvcRequestBuilders.delete("/api/desenvolvedores/2"))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        assertFalse(desenvolvedorRepository.existsById(2));
    }

}