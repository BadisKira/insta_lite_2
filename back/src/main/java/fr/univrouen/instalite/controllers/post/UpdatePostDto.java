package fr.univrouen.instalite.controllers.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePostDto {
    private String postId;
    private String title;
    private String description;
    private Boolean isPublic;
    private MultipartFile data;
}