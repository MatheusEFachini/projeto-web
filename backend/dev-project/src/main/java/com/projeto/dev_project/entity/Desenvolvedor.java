package com.projeto.dev_project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="desenvolvedor")
public class Desenvolvedor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToMany
    @Column(name = "nivel_id")
    private Nivel nivel;

    @Size(min=2, max=250)
    private String nome;

    @NotBlank
    @Size(max = 1)
    private String sexo;

    @NotNull
    @Past
    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    private String hobby;

}
