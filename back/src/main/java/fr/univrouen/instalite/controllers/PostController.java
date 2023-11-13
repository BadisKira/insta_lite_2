package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.CreatePostDto;
import fr.univrouen.instalite.dtos.PostCreatedDto;
import fr.univrouen.instalite.dtos.PostDto;
import fr.univrouen.instalite.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostCreatedDto> create(CreatePostDto createPostDto){
        String id = postService.create(createPostDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PostCreatedDto(id));
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<Resource> get(@PathVariable("id") String id){
        ResourceDto resourceDto = postService.getById(id);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + id + "." +resourceDto.getExtension() + "\"").body(resourceDto.getResource());
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> get(@PathVariable("id") String id) throws IOException {
        PostDto postDto = postService.getById(id);
        return ResponseEntity.ok().body(postDto);
    }

    //Get user's all posts

    //Get public posts

    //Get private posts

    //
}