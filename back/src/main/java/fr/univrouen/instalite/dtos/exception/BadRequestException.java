package fr.univrouen.instalite.dtos.exception;


import lombok.Getter;

@Getter
public class BadRequestException extends  Exception{
    private String message ;
    private int status ;
    public BadRequestException(String message){
        super();
        this.status = 400 ;
        this.message = message ;
    }
}
