package fr.univrouen.instalite.dtos.post;


import fr.univrouen.instalite.entities.like.Like;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostDto {
    private String id;
    private String title;
    private String description;
    private boolean isPublic;
    private Date createdAt;
    private Long userId;
    private String userName;
    private int commentsNumber;
    private List<Like> likes ;

}

