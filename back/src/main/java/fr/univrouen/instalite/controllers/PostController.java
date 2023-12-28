package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.post.CreatePostDto;
import fr.univrouen.instalite.dtos.post.PostCreatedDto;
import fr.univrouen.instalite.dtos.post.PostDto;
import fr.univrouen.instalite.dtos.post.UpdatePostDto;
import fr.univrouen.instalite.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostCreatedDto> create(Authentication authentication, CreatePostDto createPostDto) {
        String id = postService.create(authentication.getName(), createPostDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PostCreatedDto(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> get(@PathVariable("id") String id) {
        PostDto postDto = postService.getById(id);
        return ResponseEntity.ok().body(postDto);
    }

    //delete post by id
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") String id){
        postService.deletePost(id);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<PostDto> update(Authentication authentication,
                                          @PathVariable("id") String id,
                                          @RequestBody UpdatePostDto updatePostDto){
        PostDto postDtoUpdated = postService.update(authentication ,id, updatePostDto);
        return ResponseEntity.ok(postDtoUpdated);
    }


    //Get user's all posts
    @GetMapping("/user/{id}")
    public ResponseEntity<List<PostDto>> getAllByUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(postService.getPostsFromOneUser(id));
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<PostDto>> getUsersPost(Authentication authentication){
        return ResponseEntity.ok(postService.getUsersPosts(authentication.getName()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERUSER')")
    public ResponseEntity<List<PostDto>> getAll(@RequestParam(defaultValue = "0") int pageNumber,
                                @RequestParam(defaultValue = "2") int pageLimit){
        return ResponseEntity.ok(postService.getAllPosts(pageNumber,pageLimit));
    }

    //Get public posts
    @GetMapping("/public")
    public ResponseEntity<List<PostDto>> getAllPublicPosts() {
        return ResponseEntity.ok(postService.getPosts(true));
    }

    //Get private posts
    @GetMapping("/private")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERUSER')")
    public ResponseEntity<List<PostDto>> getAllPrivatePosts() {
       return ResponseEntity.ok(postService.getPosts(false));
    }


    @PutMapping("/{postId}/like")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostDto> toggleLike(Authentication authentication, @PathVariable String postId) {
        return ResponseEntity.ok(postService.like(postId, authentication.getName()));
    }

}