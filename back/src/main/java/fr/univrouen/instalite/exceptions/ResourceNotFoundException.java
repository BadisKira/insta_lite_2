package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends CustomException{
    public ResourceNotFoundException(){
        super("Resource not found", HttpStatus.NOT_FOUND);
    }
}
