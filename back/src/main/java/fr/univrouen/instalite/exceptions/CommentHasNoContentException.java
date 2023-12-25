package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class CommentHasNoContentException extends CustomException{
    public CommentHasNoContentException(){
        super("Comment has no content", HttpStatus.BAD_REQUEST);
    }
}
