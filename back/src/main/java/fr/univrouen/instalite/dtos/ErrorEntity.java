package fr.univrouen.instalite.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public  class ErrorEntity {
    private int status ;
    private String message ;
}