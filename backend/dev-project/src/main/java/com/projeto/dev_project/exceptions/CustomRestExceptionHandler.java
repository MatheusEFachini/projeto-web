package com.projeto.dev_project.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomRestExceptionHandler {

    @ExceptionHandler(ApplicationGlobalException.class)
    public ResponseEntity handleApplicationGlobalException(ApplicationGlobalException e){
        return ResponseEntity.status(e.getCustomException().getCode())
                .body(e.getCustomException());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleDataIntegrityViolationException(Exception e){
        return ResponseEntity.status(400)
                .body(new CustomException(400,e.getMessage(),"Integridade violada"));
    }
}
