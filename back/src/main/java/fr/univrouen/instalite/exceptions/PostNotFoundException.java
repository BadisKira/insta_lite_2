package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class PostNotFoundException extends CustomException{
    public PostNotFoundException() {
        super("Post not found", HttpStatus.NOT_FOUND);
    }
}
