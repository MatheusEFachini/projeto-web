package com.projeto.dev_project.exceptions;

import lombok.Data;

@Data
public class ApplicationGlobalException extends RuntimeException {

    private CustomException customException;

    public ApplicationGlobalException(CustomException customException){
        super();
        this.customException = customException;
    }
}
