package fr.univrouen.instalite.dtos.post;

import fr.univrouen.instalite.entities.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostDto {
    private MultipartFile data;
    private String title;
    private String description;
    private boolean isPublic;
    private Date createdAt;
}
