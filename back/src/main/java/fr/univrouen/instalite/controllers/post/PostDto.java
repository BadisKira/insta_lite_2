package fr.univrouen.instalite.controllers.post;


import fr.univrouen.instalite.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private String id;
    private String title;
    private String description;
    private boolean isPublic;
    private Long userId;
    private String userName;
}
