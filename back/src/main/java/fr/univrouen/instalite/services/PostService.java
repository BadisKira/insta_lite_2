package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.SupportedExtensions;
import fr.univrouen.instalite.dtos.post.*;
import fr.univrouen.instalite.exceptions.*;
import fr.univrouen.instalite.entities.*;
import fr.univrouen.instalite.repositories.CommentRepository;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
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

    //Create a post
    public String create(CreatePostDto createPostDto){
        //We check if the folder in which we store the files exists
        if (!new File(resourcePath).exists()) {
            try {
                //if it is not, we try to create the folder
                Files.createDirectories(Paths.get(resourcePath));
            } catch (Exception e) {
                throw new FileCouldNotBeCreatedException();
            }
        }

        //Extract the file type and extension
        String[] contentType = createPostDto.getData().getContentType().split("/");
        String type = contentType[0];
        String extension = contentType[1];

        //Check if the file is supported
        boolean isSupported = false;
        for (SupportedExtensions s : SupportedExtensions.values()){
            if(s.getExtension().equalsIgnoreCase(extension)){
                isSupported = true;
                break;
            }
        }
        if(!isSupported)
            throw new UnsupportedFileTypeException();

        //Check the user
        Optional<User> user = userRepository.findById(createPostDto.getUserId());
        if(user.isEmpty())
            throw new UserNotFoundException();

        //Create the post entity
        Post post = new Post(null, createPostDto.getTitle(),
                createPostDto.getDescription(),
                extension, type
                ,createPostDto.getIsPublic()
                ,Date.valueOf(LocalDate.now())
                ,user.get(),
                new ArrayList<Comment>(),
                new ArrayList<>()
        );
        postRepository.save(post);

        //Create the file in the folder
        createResource(resourcePath + post.getId() + "." + extension,createPostDto.getData());

        return post.getId();
    }


    //Get a post by id
    public PostDto getById(String id){
        //Check if the post exists
        Optional<Post> optPost = postRepository.findById(id);
        if(optPost.isEmpty())
            throw new PostNotFoundException();

        Post post = optPost.get();
        return modelMapper.map(post,PostDto.class);
    }

    //Get all the public or private posts
    public List<PostDto> getPosts(boolean isPublic , int pageNumber, int pageLimit){
        Page<Post> page = isPublic ? postRepository.findPostsByIsPublicTrue(PageRequest.of(pageNumber,pageLimit))
                : postRepository.findPostsByIsPublicFalse(PageRequest.of(pageNumber,pageLimit)) ;
        return page.get().map(x -> modelMapper.map(x, PostDto.class)).toList();
     }

     //Get all the posts
    public List<PostDto> getAllPosts(int pageNumber, int pageLimit){
        Page<Post> page = postRepository.findAll(PageRequest.of(pageNumber,pageLimit));
        return page.get().map(x -> modelMapper.map(x, PostDto.class)).toList();
    }

    //Update a post
    public PostDto update(Authentication authentication, String id, UpdatePostDto updatePostDto){
        //Check for the user
        Optional<User> user = userRepository.findByEmailIgnoreCase(authentication.getName());
        if(user.isEmpty())
            throw new UserNotFoundException();

        //Check for the post
        Optional<Post> post = postRepository.findById(id);
        if(post.isEmpty())
            throw new PostNotFoundException();

        //If there is a file in the request, we change the file
        if(updatePostDto.getData() != null){
            //Extract the type and the extension
            String[] contentType = updatePostDto.getData().getContentType().split("/");
            String type = contentType[0];
            String extension = contentType[1];

            //Check if the file is supported
            boolean isSupported = false;
            for (SupportedExtensions s : SupportedExtensions.values()){
                if(s.getExtension().equalsIgnoreCase(extension)){
                    isSupported = true;
                    break;
                }
            }
            if(!isSupported)
                throw new UnsupportedFileTypeException();

            //Delete the old file
            String oldFileName = post.get().getId() + "." + post.get().getExtension();
            deleteResource(resourcePath + oldFileName);

            //Create the new file
            String filePath = resourcePath + post.get().getId() + "." + extension;
            createResource(filePath, updatePostDto.getData());

            //Update the entity
            post.get().setPostType(type);
            post.get().setExtension(extension);
        }

        //If there is a description in the request, we change it
        if(updatePostDto.getDescription() != null){
            post.get().setDescription(updatePostDto.getDescription());
        }
        //If there is a title in the request, we change it
        if(updatePostDto.getTitle() != null){
            post.get().setTitle(updatePostDto.getTitle());
        }
        //If there is a isPublic in the request, we change it
        if(updatePostDto.getIsPublic() != null){
            post.get().setPublic(updatePostDto.getIsPublic());
        }

        //Save the entity and return modified informations
        postRepository.save(post.get());
        return modelMapper.map(post.get(),PostDto.class);
    }

    //Delete a post
    public void deletePost(String idPost){
        //Check if the post exists
        Optional<Post> postToDelete = postRepository.findById(idPost);
        if (postToDelete.isEmpty())
            throw new PostNotFoundException();

        //Clear all likes of the post
        postToDelete.get().getLikedUsers().clear();
        postRepository.save(postToDelete.get());

        //Delete the file
        String filePath = resourcePath + idPost + "." + postToDelete.get().getExtension();
        deleteResource(filePath);

        //Delete the entity
        postRepository.delete(postToDelete.get());
    }

    //Delete a file
    private void deleteResource(String filePath){
        Path path = Paths.get(filePath);
        try{
            Files.deleteIfExists(path);
        }catch (IOException e){
            throw new ResourceCouldNotBeenDeletedException();
        }
    }

    //Create a file
    private void createResource(String filePath, MultipartFile data) {
        File file = new File(filePath);
        try{
            OutputStream os = new FileOutputStream(file);
            os.write(data.getBytes());
        }catch (Exception e){
            throw new FileCouldNotBeCreatedException();
        }
    }

    //Get posts of a user
    public List<PostDto> getPostsFromOneUser(Long id, int pageNumber, int pageLimit, String visibilityType) {
        //Check if the user exists
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty())
            throw new UserNotFoundException();

        //get the posts depending of the visibility
        Page<Post> page = switch (visibilityType) {
            case "all" -> postRepository.findPostsByUser_Id(user.get().getId(),
                    PageRequest.of(pageNumber, pageLimit, Sort.by("createdAt").descending()));
            case "public" -> postRepository.findPostsByIsPublicTrueAndUser_Id(user.get().getId(),
                    PageRequest.of(pageNumber, pageLimit, Sort.by("createdAt").descending()));
            case "private" -> postRepository.findPostsByIsPublicFalseAndUser_Id(user.get().getId(),
                    PageRequest.of(pageNumber, pageLimit, Sort.by("createdAt").descending()));
            default -> postRepository.findPostsByUser_Id(user.get().getId(),
                    PageRequest.of(pageNumber, pageLimit, Sort.by("createdAt").descending()));
        };

        return page.get().map(x -> modelMapper.map(x, PostDto.class)).toList();
    }

    //Like a post
    public PostDto like(String postId, String email){
        //Check if the post exists
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            throw new PostNotFoundException();

        //Check if the user exists
        Optional<User> user = userRepository.findByEmailIgnoreCase(email);
        if(user.isEmpty())
            throw new UserNotFoundException();

        //if user is already liked the post, we remove the like
        if(!post.get().getLikedUsers().contains(user.get())){
            post.get().getLikedUsers().add(user.get());
            postRepository.save(post.get());
        }
        //else we add a like
        else{
            post.get().getLikedUsers().remove(user.get());
            postRepository.save(post.get());
        }

        return modelMapper.map(post.get(),PostDto.class);
    }

    //Dashboard informations of posts. Returns posts of the month,week,day and all time.
    public PostDashboardDto postDashboard(){
        LocalDate minusWeek =  LocalDate.now().minusWeeks(1);
        LocalDate minusMonth = LocalDate.now().minusMonths(1);
        LocalDate minusDay = LocalDate.now().minusDays(1);

        long monthPosts = postRepository.findAll().stream().filter(p -> minusMonth.isBefore(p.getCreatedAt().toLocalDate())).count();
        long weekPosts = postRepository.findAll().stream().filter(p -> minusWeek.isBefore(p.getCreatedAt().toLocalDate())).count();
        long dayPosts = postRepository.findAll().stream().filter(p -> minusDay.isBefore(p.getCreatedAt().toLocalDate())).count();
        long allPosts = postRepository.count();

        return new PostDashboardDto(
                dayPosts,
                weekPosts,
                monthPosts,
                allPosts
        );
    }

    //Dashboard informations of likes
    public LikeDashboardDto likeDashboard(){
        long postCount = postRepository.count();
        long likeCount = postRepository.findAll().stream().mapToInt(p -> p.getLikedUsers().size()).sum();

        Optional<Integer> mostLike = postRepository.findAll().stream().map(p -> p.getLikedUsers().size()).max(Integer::compare);
        long averageLike = postCount > 0 ? likeCount / postCount : 0;

        return new LikeDashboardDto(
                mostLike.isPresent() ?
                        (long)mostLike.get()
                        : 0,
                averageLike,
                likeCount);
    }
}
