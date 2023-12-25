package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.exceptions.*;
import fr.univrouen.instalite.dtos.post.CreatePostDto;
import fr.univrouen.instalite.dtos.post.PostDto;
import fr.univrouen.instalite.dtos.post.UpdatePostDto;
import fr.univrouen.instalite.entities.*;
import fr.univrouen.instalite.entities.like.Like;
import fr.univrouen.instalite.entities.like.LikeKey;
import fr.univrouen.instalite.repositories.CommentRepository;
import fr.univrouen.instalite.repositories.LikeRepository;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
private final LikeRepository likeRepository ;
    private final CommentRepository commentRepository;


    @Value("${RESOURCE_PATH}")
    private String resourcePath;

    public PostService(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }

    public String create(String email, CreatePostDto createPostDto){
        if(!new File(resourcePath).exists()){
            try{
                Files.createDirectories(Paths.get(resourcePath));
            }catch (Exception e){
                throw new FileCouldNotBeCreatedException();
            }
        }

    public String create(CreatePostDto createPostDto){
        String[] contentType = createPostDto.getData().getContentType().split("/");

        String type = contentType[0];
        String extension = contentType[1];

        //ToDo : block zip

        Optional<User> user = userRepository.findByEmailIgnoreCase(email);

        if(user.isEmpty())
            throw new UserNotFoundException();

        Post post = new Post(null, createPostDto.getTitle(),
                createPostDto.getDescription(),
                extension, type
                ,createPostDto.isPublic()
                ,Date.valueOf(LocalDate.now())
                ,user.get(),
                new ArrayList<Comment>(),
                new ArrayList<Like>()
        );
        postRepository.save(post);

        File file = new File(resourcePath + post.getId() + "." + extension);
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(createPostDto.getData().getBytes());
        } catch (Exception e){
            throw new FileCouldNotBeCreatedException();
        }

        return post.getId();
    }


    public PostDto getById(String id){
        Optional<Post> optPost = postRepository.findById(id);

        if(optPost.isEmpty())
            throw new PostNotFoundException();

        Post post = optPost.get();

        return modelMapper.map(post,PostDto.class);
    }

    public List<PostDto> getPostsFromOneUser(Long idUser){
        Optional<User> user = userRepository.findById(idUser);

        if(user.isEmpty())
            throw new EntityNotFoundException("User not found");

        return user.get().getPosts().stream().map(x ->modelMapper.map(x,PostDto.class)).toList();
    }

    public List<PostDto> getPublicPosts() throws IOException {
        List<Post> postsPublic = postRepository.findByIsPublicTrue();
        return postsPublic.stream().map(x -> modelMapper.map(x,PostDto.class)).toList();
    }

    public List<PostDto> getPosts(boolean isPublic){
        List<Post> posts = isPublic ? postRepository.findByIsPublicTrue() :
                                    postRepository.findByIsPublicFalse();

        return posts.stream().map(x -> modelMapper.map(x,PostDto.class)).toList();
     }

    public List<PostDto> getAllPosts(int pageNumber, int pageLimit){
        Page<Post> page = postRepository.findAll(PageRequest.of(pageNumber,pageLimit));
        return page.get().map(x -> modelMapper.map(x, PostDto.class)).toList();
    }

    public PostDto update(Authentication authentication, String id, UpdatePostDto updatePostDto) {
        Optional<User> user = userRepository.findByEmailIgnoreCase(authentication.getName());
        if(user.isEmpty())
            throw new UserNotFoundException();

        Optional<Post> post = postRepository.findById(id);
        if(post.isEmpty())
            throw new PostNotFoundException();

        if(!user.get().getPosts().contains(post.get()) && user.get().getRole().getName() != RoleEnum.ADMIN)
            throw new UserNotAllowToModifyException();

        if(updatePostDto.getData() != null){
            String[] contentType = updatePostDto.getData().getContentType().split("/");
            String type = contentType[0];
            String extension = contentType[1];
            String oldFileName = post.get().getId() + "." + post.get().getExtension();

            if(extension.equals("zip"))
                throw new UnsupportedFileTypeException();

            deleteResource(resourcePath + oldFileName);

            String filePath = resourcePath + post.get().getId() + "." + extension;

            createResource(filePath, updatePostDto.getData());

            post.get().setPostType(type);
            post.get().setExtension(extension);
        }

        if(updatePostDto.getDescription() != null){
            post.get().setDescription(updatePostDto.getDescription());
        }
        if(updatePostDto.getTitle() != null){
            post.get().setTitle(updatePostDto.getTitle());
        }
        if(updatePostDto.getIsPublic() != null){
            post.get().setPublic(updatePostDto.getIsPublic());
        }

        postRepository.save(post.get());

        return modelMapper.map(post.get(),PostDto.class);
    }

    public void deletePost(String idPost) {
        Optional<Post> postToDelete = postRepository.findById(idPost);
        if (postToDelete.isEmpty())
            throw new PostNotFoundException();

        postRepository.delete(postToDelete.get());
        String filePath = resourcePath + idPost + "." + postToDelete.get().getExtension();
        deleteResource(filePath);
    }

    private void deleteResource(String filePath){
        File file = new File(filePath);
        file.delete();
    }

    private void createResource(String filePath, MultipartFile data) {
        File file = new File(filePath);
        try{
            OutputStream os = new FileOutputStream(file);
            os.write(data.getBytes());
        }catch (Exception e){
            throw new FileCouldNotBeCreatedException();
        }
    }

    public List<PostDto> getUsersPosts(String email) {
        Optional<User> user = userRepository.findByEmailIgnoreCase(email);

        if(user.isEmpty())
            throw new UserNotFoundException();

        return user.get().getPosts().stream().map(x ->
                modelMapper.map(x,PostDto.class)).toList();
    }

    public PostDto toggleLike(String postId, Long userId) throws IOException {
        Optional<Post> postOptional = postRepository.findById(postId);
        Optional<User> userOptional = userRepository.findById(userId);




        Post post = null;
        if (postOptional.isPresent() && userOptional.isPresent()) {
            post = postOptional.get();
            User user = userOptional.get();

            Optional<Like> isThereALike = likeRepository.findLikeByPost_IdAndUser_Id(postId , userId) ;

            if (isThereALike.isEmpty()) {
                System.out.println("Add the like");
                Like like = new Like(new LikeKey(userId,postId),user , post)  ;
                likeRepository.save(like) ;
                post.getLikes().add(like) ;
            } else {
                System.out.println("Delete the like");
                likeRepository.delete(isThereALike.get());
                post.getLikes().remove(isThereALike.get()) ;
            }


        }


        return postToDto(post) ;
    }


}
