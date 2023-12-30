package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceCouldNotBeenDeletedException extends CustomException{
    public ResourceCouldNotBeenDeletedException(){
        super("Resource could not been deleted in the server. Please contact your admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
