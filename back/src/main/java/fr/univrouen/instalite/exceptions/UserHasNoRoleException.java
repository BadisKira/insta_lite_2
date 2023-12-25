package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class UserHasNoRoleException extends CustomException{
    public UserHasNoRoleException() {
        super("User has no role", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
