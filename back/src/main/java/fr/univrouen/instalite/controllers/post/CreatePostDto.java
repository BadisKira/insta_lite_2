package fr.univrouen.instalite.controllers.post;

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

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }
    public Boolean isPublic(){
        return  this.isPublic;
    }
}
