package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.ResourceDto;
import fr.univrouen.instalite.entities.Post;
import fr.univrouen.instalite.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.MalformedURLException;
import java.util.Optional;

@Service
public class ResourceService {
    private final PostRepository postRepository;

    @Value("${RESOURCE_PATH}")
    private String resourcePath;

    public ResourceService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public ResourceDto getById(String id) throws MalformedURLException {
        Optional<Post> optPost = postRepository.findById(id);
        if(optPost.isEmpty()){
            //ToDo : Error !
            return null;
        }

        Post post = optPost.get();
        File file = new File(resourcePath + id + "." + post.getExtension());
        Resource resource;
        resource = new UrlResource(file.toURI());

        return new ResourceDto(resource, post.getExtension());
    }
}
