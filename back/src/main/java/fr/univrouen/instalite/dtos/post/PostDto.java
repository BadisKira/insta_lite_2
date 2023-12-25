package fr.univrouen.instalite.dtos.post;


import fr.univrouen.instalite.entities.User;
import lombok.*;

import java.sql.Date;

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
    private String userFirstname;
    private String userLastname;
    private Integer commentsNumber;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

