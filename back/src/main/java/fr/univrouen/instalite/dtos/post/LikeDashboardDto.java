package fr.univrouen.instalite.dtos.post;

import lombok.*;

@Data
@AllArgsConstructor
@Setter
@Getter
@ToString
public class LikeDashboardDto {

        private Long mostLikesPost ;
        private Long countAverageLikes ;
        private Long allLikes ;


}
