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
    public ResponseEntity<PostDto> delete(@PathVariable("id") String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostDto> update(Authentication authentication,
                                          @PathVariable("id") String id,
                                          UpdatePostDto updatePostDto) {
        PostDto postDtoUpdated = this.postService.update(authentication ,id, updatePostDto);
        return ResponseEntity.ok(postDtoUpdated);
    }


    //Get user's all posts
    @GetMapping("/user/{id}")
    public List<PostDto> getAllByUser(@PathVariable("id") Long id) {
        return postService.getPostsFromOneUser(id);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public List<PostDto> getUsersPost(Authentication authentication){
        return postService.getUsersPosts(authentication.getName());
    }

    @GetMapping("/all")
    //@PreAuthorize("hasRole('SUPERUSER')")
    public List<PostDto> getAll(@RequestParam(defaultValue = "0") int pageNumber,
                                @RequestParam(defaultValue = "2") int pageLimit){
        return postService.getAllPosts(pageNumber,pageLimit);
    }

    //Get public posts
    @GetMapping("/public")
    public List<PostDto> getAllPublicPosts() {
        return postService.getPosts(true);
    }

    //Get private posts
    @GetMapping("/private")
    public List<PostDto> getAllPrivatePosts() {
       return postService.getPosts(false);
    }


    @PutMapping("/{postId}/like")
    public ResponseEntity<PostDto> toggleLike( @PathVariable String postId) throws IOException {
        // get the id from the token
        Long userId = Long.valueOf(2);
        return  ResponseEntity.ok().body(this.postService.toggleLike(postId,userId)) ;
    }

}