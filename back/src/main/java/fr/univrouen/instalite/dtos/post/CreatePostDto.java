package fr.univrouen.instalite.dtos.post;

import fr.univrouen.instalite.entities.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreatePostDto {
    private Long userId ;
    private MultipartFile data;
    private String title;
    private String description;
    private Boolean isPublic;
    private Date createdAt;

}
