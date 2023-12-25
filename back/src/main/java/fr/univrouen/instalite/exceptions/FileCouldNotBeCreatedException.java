package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class FileCouldNotBeCreatedException extends CustomException{
    public FileCouldNotBeCreatedException(){
        super("File could not be created in the server. Please contact the admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
