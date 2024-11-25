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
import java.time.Period;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="desenvolvedor")
public class Desenvolvedor {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "desenvolvedorId")
    @SequenceGenerator(name = "desenvolvedorId", sequenceName = "SEQ_DESENVOLVEDOR", allocationSize = 1)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "nivel_id", referencedColumnName = "id")
    private Nivel nivel_id;

    @Size(min=2, max=250)
    private String nome;

    @NotBlank
    @Size(max = 1)
    private String sexo;

    @NotNull
    @Past
    private LocalDate data_nascimento;

    private String hobby;

    @Transient
    private Integer idade;

    @PostLoad
    private void calculateIdade(){
        this.idade = Period.between(this.data_nascimento, LocalDate.now()).getYears();
    }
}
