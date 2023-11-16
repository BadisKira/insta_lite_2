package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.exception.BadRequestException;
import fr.univrouen.instalite.dtos.post.CreatePostDto;
import fr.univrouen.instalite.dtos.post.PostCreatedDto;
import fr.univrouen.instalite.dtos.post.PostDto;
import fr.univrouen.instalite.dtos.post.UpdatePostDto;
import fr.univrouen.instalite.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> get(@PathVariable("id") String id) throws IOException {
        PostDto postDto = postService.getById(id);
        return ResponseEntity.ok().body(postDto);
    }

    //delete post by id
    @DeleteMapping("/{id}")
    public ResponseEntity<PostDto> delete(@PathVariable("id") String id) {
        PostDto post = postService.deletePost(id);
        return ResponseEntity.ok().body(post);
    }

    @PatchMapping
    public ResponseEntity<PostDto> update(UpdatePostDto updatePostDto) throws IOException, BadRequestException {
        PostDto postDtoUpdated = this.postService.update(updatePostDto) ;
        return ResponseEntity.ok().body(postDtoUpdated) ;
    }


    //Get user's all posts
    @GetMapping("/user/{id}")
    public List<PostDto> getAllByUser(@PathVariable("id") Long id) throws IOException {
        return  postService.getPostsFromOneUser(id) ;
    }


    @GetMapping("/all")
    public List<PostDto> getAll(@RequestParam(defaultValue = "0") int pageNumber,
                                @RequestParam(defaultValue = "2") int pageLimit){
        return postService.getAllPosts(pageNumber,pageLimit);
    }

    //Get public posts
    @GetMapping("/public")
    public List<PostDto> getAllPublicPosts(){
        return postService.getPosts(true);
    }

    //Get private posts
    @GetMapping("/private")
    public List<PostDto> getAllPrivatePosts(){
       return postService.getPosts(false);
    }
}