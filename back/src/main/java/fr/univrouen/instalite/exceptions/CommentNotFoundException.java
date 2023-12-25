package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class CommentNotFoundException extends CustomException{
    public CommentNotFoundException(){
        super("Comment not found", HttpStatus.NOT_FOUND);
    }
}
