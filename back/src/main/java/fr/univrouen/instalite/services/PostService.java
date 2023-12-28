package fr.univrouen.instalite.services;

import fr.univrouen.instalite.exceptions.*;
import fr.univrouen.instalite.dtos.post.CreatePostDto;
import fr.univrouen.instalite.dtos.post.PostDto;
import fr.univrouen.instalite.dtos.post.UpdatePostDto;
import fr.univrouen.instalite.entities.*;
import fr.univrouen.instalite.repositories.CommentRepository;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;


    @Value("${RESOURCE_PATH}")
    private String resourcePath;

    public PostService(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    public String create(String email, CreatePostDto createPostDto){
        if (!new File(resourcePath).exists()) {
            try {
                Files.createDirectories(Paths.get(resourcePath));
            } catch (Exception e) {
                throw new FileCouldNotBeCreatedException();
            }
        }

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
                new ArrayList<>()
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



    public List<PostDto> getPosts(boolean isPublic , int pageNumber, int pageLimit){
        Page<Post> page = isPublic ? postRepository.findPostsByIsPublicTrue(PageRequest.of(pageNumber,pageLimit))
                : postRepository.findPostsByIsPublicFalse(PageRequest.of(pageNumber,pageLimit)) ;
        return page.get().map(x -> modelMapper.map(x, PostDto.class)).toList();
     }

    public List<PostDto> getAllPosts(int pageNumber, int pageLimit){
        Page<Post> page = postRepository.findAll(PageRequest.of(pageNumber,pageLimit));
        return page.get().map(x -> modelMapper.map(x, PostDto.class)).toList();
    }

    public PostDto update(Authentication authentication, String id, UpdatePostDto updatePostDto) throws IOException {
        Optional<User> user = userRepository.findByEmailIgnoreCase(authentication.getName());
        if(user.isEmpty())
            throw new UserNotFoundException();

        Optional<Post> post = postRepository.findById(id);
        if(post.isEmpty())
            throw new PostNotFoundException();

        /**
         * if(!user.get().getPosts().contains(post.get()) && user.get().getRole().getName() != RoleEnum.ADMIN)
         *             throw new UserNotAllowToModifyException();
         * */
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

    public void deletePost(String idPost) throws IOException {
        Optional<Post> postToDelete = postRepository.findById(idPost);
        if (postToDelete.isEmpty())
            throw new PostNotFoundException();
        postRepository.delete(postToDelete.get());
        String filePath = resourcePath + idPost + "." + postToDelete.get().getExtension();
        deleteResource(filePath);
    }

    private void deleteResource(String filePath) throws IOException {
        /*File file = new File(filePath);
        file.delete();*/

        Path path = Paths.get(filePath);
        Files.deleteIfExists(path);
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

    public PostDto like(String postId, String email){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            throw new PostNotFoundException();

        Optional<User> user = userRepository.findByEmailIgnoreCase(email);
        if(user.isEmpty())
            throw new UserNotFoundException();

        if(!post.get().getLikedUsers().contains(user.get())){
            post.get().getLikedUsers().add(user.get());
            postRepository.save(post.get());
        }
        else{
            post.get().getLikedUsers().remove(user.get());
            postRepository.save(post.get());
        }

        return modelMapper.map(post.get(),PostDto.class);
    }

}
