package fr.univrouen.instalite.dtos.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommentDto {
    private String postId;
    private Long userId ;
    private String content;
}
