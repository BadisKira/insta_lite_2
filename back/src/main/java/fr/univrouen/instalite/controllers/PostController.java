package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.exception.BadRequestException;
import fr.univrouen.instalite.dtos.post.CreatePostDto;
import fr.univrouen.instalite.dtos.post.PostCreatedDto;
import fr.univrouen.instalite.dtos.post.PostDto;
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

    //delete post by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") String id) {
        Boolean TOUTCESTBIENPASSE  = postService.deletePost(id);
        if(TOUTCESTBIENPASSE) {
            return ResponseEntity.ok().body("Le post " + id + " a été bien supprimé") ;
        }else {
            return ResponseEntity.notFound().build() ;
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PostDto> update(@PathVariable("id") String id , @RequestBody CreatePostDto createPostDto) throws IOException, BadRequestException {
        PostDto postDtoUpdated = this.postService.update(id, createPostDto) ;
        return ResponseEntity.ok().body(postDtoUpdated) ;
    }


    //Get user's all posts
    @GetMapping("/user/{id}")
    public List<PostDto> getAllByUser(@PathVariable("id") Long id) throws IOException {
        return  postService.getPostsFromOneUser(id) ;
    }


    @GetMapping("/all")
    public List<PostDto> getAll() throws IOException {
        return postService.getAllPosts();
    }

    //Get public posts
    @GetMapping("/public")
    public List<PostDto> getAllPublicPosts() throws  IOException {
        return postService.getPublicPosts() ;
     }
    //Get private posts

     @GetMapping("/private")
        public List<PostDto> getAllPrivatePosts() throws  IOException {
           return postService.getPrivatePosts() ;
        }
    //
}