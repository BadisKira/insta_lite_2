package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

//This exception is used only when the user tries to update his informations
public class PasswordDoesNotMatchException extends CustomException{
    public PasswordDoesNotMatchException(){
        super("Password does not match", HttpStatus.BAD_REQUEST);
    }
}
