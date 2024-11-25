package com.projeto.dev_project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NivelDTO {
    private Integer id;
    private String nivel;
    private Integer quantidade_devs;
}
