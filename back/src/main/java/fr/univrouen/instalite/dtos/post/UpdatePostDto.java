package fr.univrouen.instalite.dtos.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePostDto {
    private String title;
    private String description;
    private Boolean isPublic;
    private MultipartFile data;
}