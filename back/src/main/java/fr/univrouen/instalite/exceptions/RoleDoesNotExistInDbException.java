package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class RoleDoesNotExistInDbException extends CustomException{
    public RoleDoesNotExistInDbException(){
        super("Role does not exist in the database. Please contact the admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
