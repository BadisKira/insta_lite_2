package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.CreatePostDto;
import fr.univrouen.instalite.dtos.PostDto;
import fr.univrouen.instalite.entities.Post;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;



    @Value("${RESOURCE_PATH}")
    private String resourcePath;
    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }


    private PostDto postToDto(Post post) throws IOException {
        byte[] fileData = Files.readAllBytes(Path.of(resourcePath + post.getId() + "." + post.getExtension()));
        String data = new String (Base64.getEncoder().encode(fileData));
        StringBuilder stringBuilder = new StringBuilder("data:");

        stringBuilder.append(post.getPostType()).
                append("/").
                append(post.getExtension()).
                append(";base64, ").
                append(data);

        return new PostDto(stringBuilder.toString(), post.getId() ,post.getTitle(),post.getDescription(),
                post.isPublic(),post.getUser().getId());
    }



    public String create(CreatePostDto createPostDto){
        String[] contentType = createPostDto.getData().getContentType().split("/");

        String type = contentType[0];
        String extension = contentType[1];

        //ToDo : block zip

        Optional<User> user = userRepository.findById(createPostDto.getUserId());
        if(user.isEmpty()){
            //ToDo : Error !
            return null;
        }

        Post post = new Post(null, createPostDto.getTitle(), createPostDto.getDescription(), extension, type ,createPostDto.isPublic(),user.get());

        postRepository.save(post);

        File file = new File(resourcePath + post.getId() + "." + extension);
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(createPostDto.getData().getBytes());
        } catch (Exception e){
            System.out.println("Error ! " + e.getMessage());
        }

        return post.getId();
    }

    /*public ResourceDto getById(String id){
        Optional<Post> optPost = postRepository.findById(id);
        if(optPost.isEmpty()){
            //ToDo : Error !
            return null;
        }

        Post post = optPost.get();
        File file = new File(resourcePath + id + "." + post.getExtension());
        Resource resource;
        try{
            resource = new UrlResource(file.toURI());
        }catch (MalformedURLException e){
            //ToDo : Error !
            return null;
        }

        return new ResourceDto(resource, post.getExtension());

        //return new PostDto(resource, id,post.getTitle(),post.getDescription(),
        //       post.isPublic(),post.getUser().getId());
    }*/


    public PostDto getById(String id) throws IOException {
        Optional<Post> optPost = postRepository.findById(id);
        if(optPost.isEmpty()){
            //ToDo : Error !
            return null;
        }

        Post post = optPost.get();

        return postToDto(post);

    }




    public List<PostDto> getPostsFromOneUser(Long idUser) throws IOException {
        Optional<List<Post>> postsByUser =  this.postRepository.getOptionalPostListByUserId(idUser);
        Stream<PostDto> postsDtoByUser = postsByUser.get().stream().map(x -> {
            try {
                return postToDto(x);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return postsDtoByUser.toList();
    }

    public List<PostDto> getPublicPosts() throws IOException {
        List<Post> postsPublic = this.postRepository.findByIsPublicTrue();
        Stream<PostDto> postsDtoPublic = postsPublic.stream().map(x -> {
            try {
                return postToDto(x);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return postsDtoPublic.toList();
    }


      public List<PostDto> getPrivatePosts() throws IOException {
              List<Post> postsPrivate =  this.postRepository.findByIsPublicFalse();
              Stream<PostDto> postsDtoPrivate = postsPrivate.stream().map(x -> {
                  try {
                      return postToDto(x);
                  } catch (IOException e) {
                      throw new RuntimeException(e);
                  }
              });
              return postsDtoPrivate.toList();
     }

    public List<PostDto> getAllPosts() throws IOException {
        List<Post> postsAll = (List<Post>) this.postRepository.findAll();
        Stream<PostDto> postsDtoPrivate = postsAll.stream().map(x -> {
            try {
                return postToDto(x);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return postsDtoPrivate.toList();
    }


    public String update(CreatePostDto updatePostDto){
        String[] contentType = updatePostDto.getData().getContentType().split("/");
        String type = contentType[0];
        String extension = contentType[1];

        //ToDo : block zip

        Optional<User> user = userRepository.findById(updatePostDto.getUserId());
        if(user.isEmpty()){
            //ToDo : Error !
            return null;
        }

        Optional<Post> post = postRepository.findById(updatePostDto.getId())  ;
        if(post.isEmpty())
            return null ;

        postRepository.save(post.get());

        File file = new File(resourcePath + post.getId() + "." + extension);
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(updatePostDto.getData().getBytes());
        } catch (Exception e){
            System.out.println("Error ! " + e.getMessage());
        }

        return post.getId();
    }

}
