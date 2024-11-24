package com.projeto.dev_project.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomException {
    private Integer code;
    private String message;
    private String cause;
}
