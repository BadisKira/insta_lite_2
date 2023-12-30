package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class CanNotCreateAdminUserException extends CustomException{
    public CanNotCreateAdminUserException() {
        super("Can't create user with admin role", HttpStatus.BAD_REQUEST);
    }
}
