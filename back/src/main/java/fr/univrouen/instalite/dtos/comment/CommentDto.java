package fr.univrouen.instalite.dtos.comment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String id ;
    private String userName;
    private String postId;
    private Date createdAt;
    private String content;
}
