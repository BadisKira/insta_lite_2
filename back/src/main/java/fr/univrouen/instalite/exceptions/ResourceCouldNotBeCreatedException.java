package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceCouldNotBeCreatedException extends CustomException{
    public ResourceCouldNotBeCreatedException(){
        super("Resource could not be created in the server. Please contact the admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}