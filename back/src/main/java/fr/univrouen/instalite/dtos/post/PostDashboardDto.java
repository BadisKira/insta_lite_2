package fr.univrouen.instalite.dtos.post;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class PostDashboardDto {
    private Long todayPosts ;

    private Long weekPosts ;
    private Long monthPosts ;
    private Long allPosts ;


}
