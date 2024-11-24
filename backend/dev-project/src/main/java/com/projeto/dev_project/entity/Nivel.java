package com.projeto.dev_project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="nivel")
public class Nivel{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nivelId")
    @SequenceGenerator(name = "nivelId", sequenceName = "SEQ_NIVEL", allocationSize = 1)
    private Integer id;

    @NotNull
    private String nivel;
}
