package fr.univrouen.instalite.dtos.comment;

import lombok.*;

@Data
@AllArgsConstructor
@Setter
@Getter
@ToString
public class CommentDashboardDto {
    private Long mostCommentsPost ;
    private Long countAverageComments ;
    private Long allComments ;
}
