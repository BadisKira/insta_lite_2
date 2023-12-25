package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class BadCredentialsException extends CustomException{
    public BadCredentialsException(){
        super("Bad credentials", HttpStatus.BAD_REQUEST);
    }
}
