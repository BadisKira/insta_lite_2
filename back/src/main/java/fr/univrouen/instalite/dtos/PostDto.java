package fr.univrouen.instalite.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private String data;
    private String id;
    private String title;
    private String description;
    private boolean isPublic;
    private Long userId;
}
