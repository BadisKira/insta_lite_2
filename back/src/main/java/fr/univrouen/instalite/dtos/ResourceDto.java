package fr.univrouen.instalite.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceDto {
    private Resource resource;
    private String extension;
}
