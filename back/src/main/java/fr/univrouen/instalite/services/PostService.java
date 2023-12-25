package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.exception.BadRequestException;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
private final LikeRepository likeRepository ;
    private final CommentRepository commentRepository;


    @Value("${RESOURCE_PATH}")
    private String resourcePath;
    
    public PostService(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }


    private PostDto postToDto(Post post) throws IOException {
        return new PostDto(
                post.getId() ,
                post.getTitle(),
                post.getDescription(),
                post.isPublic(),
                post.getCreatedAt(),
                post.getUser().getId(),
                post.getUser().getFirstname() +" "+ post.getUser().getLastname(),
                commentRepository.countCommentsByPost_Id(post.getId()),
                likeRepository.findLikesByPost_Id(post.getId())

        );
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

        Post post = new Post(null, createPostDto.getTitle(),
                createPostDto.getDescription(),
                extension, type
                ,createPostDto.isPublic()
                ,Date.valueOf(LocalDate.now())
                ,user.get() ,
                new ArrayList<Comment>(),
                new ArrayList<Like>()
        );
        postRepository.save(post);

        File file = new File(resourcePath + post.getId() + "." + extension);
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(createPostDto.getData().getBytes());
        } catch (Exception e){
            System.out.println("Error ! " + e.getMessage());
        }

        return post.getId();
    }


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
        Optional<List<Post>> postsByUser = Optional.ofNullable(this.postRepository.getOptionalPostListByUserId(idUser).orElseThrow(
                () -> new EntityNotFoundException("Une erreur de merde est survenue")
        ));
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

    public List<PostDto> getPosts(boolean isPublic){
        List<Post> postsPrivate = isPublic ? postRepository.findByIsPublicTrue() :
                                    postRepository.findByIsPublicFalse();

        Stream<PostDto> postsDtoPrivate = postsPrivate.stream().map(x -> {
            try {
                return postToDto(x);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return postsDtoPrivate.toList();
     }

    public List<PostDto> getAllPosts(int pageNumber, int pageLimit){

        Page<Post> page = postRepository.findAll(PageRequest.of(pageNumber,pageLimit));
         return page.get().map(post -> {
            try {
               return postToDto(post);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList();


    }

    public PostDto update(UpdatePostDto updatePostDto) throws IOException, BadRequestException {
        /**
         * Verify that the post exists retrieve it
         * then update it's data
         * then save
         * */
        Optional<Post> post = postRepository.findById(updatePostDto.getPostId());
        if(post.isEmpty())
            throw new EntityNotFoundException("Le Post que vous voulez modifier n'existe pas");

        if(updatePostDto.getData() != null){
            String[] contentType = updatePostDto.getData().getContentType().split("/");
            String type = contentType[0];
            String extension = contentType[1];
            String oldFileName = post.get().getId() + "." + post.get().getExtension();

            if(extension.equals("zip")) {
                throw new BadRequestException("Le Format de votre fichier n'est pas autorisé");
            }

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

        return postToDto(post.get());
    }

    public PostDto deletePost(String idPost) {
        try {
            Optional<Post> postTodelete = this.postRepository.findById(idPost);
            if (postTodelete.isEmpty())
                throw new EntityNotFoundException();
            this.postRepository.delete(postTodelete.get());
            String filePath = resourcePath + idPost + "." + postTodelete.get().getExtension();
            deleteResource(filePath);
            return postToDto(postTodelete.get());
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private void deleteResource(String filePath){
        File file = new File(filePath);
        file.delete();
    }

    private void createResource(String filePath, MultipartFile data) throws IOException {
        File file = new File(filePath);
        OutputStream os = new FileOutputStream(file);
        os.write(data.getBytes());

        os.close();
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
