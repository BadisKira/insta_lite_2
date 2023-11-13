package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.CreatePostDto;
import fr.univrouen.instalite.dtos.PostCreatedDto;
import fr.univrouen.instalite.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}