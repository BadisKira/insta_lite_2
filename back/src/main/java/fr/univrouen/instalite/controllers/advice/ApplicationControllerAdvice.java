package fr.univrouen.instalite.controllers.advice;


import fr.univrouen.instalite.dtos.ErrorDto;
import fr.univrouen.instalite.exceptions.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApplicationControllerAdvice {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorDto> handleResourceNotFoundException(CustomException ex) {
        return new ResponseEntity<>(new ErrorDto(ex.getMessage()), ex.getStatusCode());
    }
}
