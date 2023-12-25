package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class UserNotAllowToModifyException extends CustomException{
    public UserNotAllowToModifyException(){
        super("User is not allowed to modify this resource", HttpStatus.UNAUTHORIZED);
    }
}
