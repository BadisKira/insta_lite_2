package fr.univrouen.instalite.controllers.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class PostCreatedDto {
    private String id;
    public PostCreatedDto(String id){
        this.id = id  ;
    }


}
