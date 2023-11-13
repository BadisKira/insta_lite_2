package fr.univrouen.instalite.dtos;

import fr.univrouen.instalite.entities.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostDto {
    private MultipartFile data;
    private String title;
    private String description;
    private boolean isPublic;
    private Long userId;
}
