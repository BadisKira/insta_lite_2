package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class UnsupportedFileTypeException extends CustomException{
    public UnsupportedFileTypeException(){
        super("File type is not supported", HttpStatus.BAD_REQUEST);
    }
}
