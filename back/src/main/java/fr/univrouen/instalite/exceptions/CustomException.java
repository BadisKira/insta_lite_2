package fr.univrouen.instalite.exceptions;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException {
    private final HttpStatus statusCode;

    public CustomException(String message, HttpStatus status) {
        super(message);
        this.statusCode = status;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }
}