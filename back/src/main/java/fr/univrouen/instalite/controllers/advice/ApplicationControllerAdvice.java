package fr.univrouen.instalite.controllers.advice;


import fr.univrouen.instalite.dtos.ErrorEntity;
import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.dtos.exception.BadRequestException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.HttpClientErrorException;

import java.io.FileNotFoundException;

@ControllerAdvice
public class ApplicationControllerAdvice {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({EntityNotFoundException.class})
    public @ResponseBody ErrorEntity handleNotFoundEntity(EntityNotFoundException exception){
        return new ErrorEntity(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({HttpClientErrorException.BadRequest.class})
    public @ResponseBody ErrorEntity handleBadRequestEntity(HttpClientErrorException.BadRequest exception){
        System.out.println(exception) ;
        return new ErrorEntity(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
    }

    @ExceptionHandler({BadRequestException.class})
    public @ResponseBody ErrorEntity handleBadRequestEntity2(BadRequestException exception){
        return new ErrorEntity(exception.getStatus(), exception.getMessage());
    }

    @ExceptionHandler({FileNotFoundException.class})
    public @ResponseBody ErrorEntity handleFileNotFound(FileNotFoundException exception){
        return new ErrorEntity(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    /**
     * JE SAIS PAS SI CA SE FAIT DE GERER CA COMME CA
     * */
    @ExceptionHandler({RuntimeException.class})
    public @ResponseBody ErrorEntity handleRuntimeException (RuntimeException exception){
        return new ErrorEntity(500 , exception.getMessage());
    }
}
