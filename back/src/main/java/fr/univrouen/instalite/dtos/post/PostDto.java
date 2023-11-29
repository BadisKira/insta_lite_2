package fr.univrouen.instalite.dtos.post;


import fr.univrouen.instalite.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private String id;
    private String title;
    private String description;
    private boolean isPublic;
    private Date createdAt;
    private Long userId;
    private String userName;


}
