package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.post.*;
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

    //Create a post
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostCreatedDto> create(CreatePostDto createPostDto) {
        String id = postService.create(createPostDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PostCreatedDto(id));
    }

    //Get a post
    @GetMapping("/{id}")
    public ResponseEntity<PostDto> get(@PathVariable("id") String id) {
        PostDto postDto = postService.getById(id);
        return ResponseEntity.ok().body(postDto);
    }

    //Delete a post by id
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") String id)  {
        postService.deletePost(id);

    }

    //Update a post
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostDto> update(Authentication authentication,
                                          @PathVariable("id") String id,
                                          UpdatePostDto updatePostDto) throws IOException {
        PostDto postDtoUpdated = this.postService.update(authentication ,id, updatePostDto);
        return ResponseEntity.ok(postDtoUpdated);
    }




    //Get user's all posts
    @GetMapping("/user/{id}")
    public ResponseEntity<List<PostDto>> getAllByUser(@PathVariable("id") Long id ,
                                                      @RequestParam(defaultValue = "0") int pageNumber,
                                                      @RequestParam(defaultValue = "2") int pageLimit,
                                                      @RequestParam(defaultValue = "all") String visibilityType) {
        return ResponseEntity.ok(postService.getPostsFromOneUser(id , pageNumber , pageLimit , visibilityType));
    }

    //Get all posts
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERUSER')")
    public ResponseEntity<List<PostDto>> getAll(@RequestParam(defaultValue = "0") int pageNumber,
                                @RequestParam(defaultValue = "2") int pageLimit){
        return ResponseEntity.ok(postService.getAllPosts(pageNumber,pageLimit));
    }

    //Get public posts
    @GetMapping("/public")
    public ResponseEntity<List<PostDto>> getAllPublicPosts(@RequestParam(defaultValue = "0") int pageNumber,
                                                           @RequestParam(defaultValue = "2") int pageLimit) {
        return ResponseEntity.ok(postService.getPosts(true,pageNumber,pageLimit));
    }

    //Get private posts
    @GetMapping("/private")
    @PreAuthorize("hasAnyRole('SUPERUSER','ADMIN')")
    public ResponseEntity<List<PostDto>> getAllPrivatePosts(@RequestParam(defaultValue = "0") int pageNumber,
                                                            @RequestParam(defaultValue = "2") int pageLimit) {
       return ResponseEntity.ok(postService.getPosts(false , pageNumber,pageLimit));
    }


    //Like a post
    @PutMapping("/{postId}/like")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostDto> toggleLike(Authentication authentication, @PathVariable String postId) {
        return ResponseEntity.ok(postService.like(postId, authentication.getName()));
    }


    //Get dashboard informations for posts
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PostDashboardDto> dashBoardPostsInfo() {
        return ResponseEntity.ok(postService.postDashboard());
    }

    //Get dashboard informations for post likes
    @GetMapping("/likes/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LikeDashboardDto> dashBoardLikesInfo() {
        return ResponseEntity.ok(postService.likeDashboard());
    }
}