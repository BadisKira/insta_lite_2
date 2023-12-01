package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.comment.CommentDto;
import fr.univrouen.instalite.dtos.comment.CreateCommentDto;
import fr.univrouen.instalite.dtos.exception.BadRequestException;
import fr.univrouen.instalite.entities.Comment;
import fr.univrouen.instalite.entities.Post;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.CommentRepository;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class CommentService {


    private PostRepository postRepository ;
    private UserRepository userRepository ;
    private CommentRepository commentRepository;

    private CommentDto commentToCommentDto(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getUser().getFirstname() + " " + comment.getUser().getLastname(),
                comment.getPost().getId(),
                comment.getCreatedAt(),
                comment.getContent()
        ) ;
    }
    public CommentService(PostRepository postRepository , CommentRepository commentRepository , UserRepository userRepository){
        this.commentRepository = commentRepository;
        this.userRepository= userRepository ;
        this.postRepository = postRepository ;
    }
    public CommentDto createComment(CreateCommentDto createCommentDto) throws BadRequestException {

        Optional<User> user = userRepository.findById(createCommentDto.getUserId());
        if(user.isEmpty())
            throw new EntityNotFoundException("l'utilisateur avec l'identifiant " + createCommentDto.getUserId() + " n'existe pas") ;
        Optional<Post> post = postRepository.findById(createCommentDto.getPostId()) ;
        if(post.isEmpty())
            throw new EntityNotFoundException("le post avec l'identifiant " + createCommentDto.getPostId() + " n'existe pas") ;

        if(createCommentDto.getContent().equals(""))
            throw  new BadRequestException("The comment has no content ");

        Date actualDate = Date.from(Instant.now());

        Comment newComment = new Comment(
                user.get(),
                post.get(),
                createCommentDto.getContent(),
                actualDate
        );



        Comment comment = commentRepository.save(newComment) ;
        return this.commentToCommentDto(comment);
    }

    public List<CommentDto> getCommentFromPost(String postId) {
        Optional<Post> post = postRepository.findById(postId) ;
        if(post.isEmpty())
            throw new EntityNotFoundException("le post avec l'identifiant " + postId + " n'existe pas") ;
        Optional<List<Comment>> commentList = Optional.ofNullable(
                  this.commentRepository.findCommentsByPost_Id(postId)
        ) ;

        Stream<CommentDto> commentDtoStream = commentList.get().stream().map(comment ->
        {
            return this.commentToCommentDto(comment);
        });
        return commentDtoStream.toList() ;
    }


    public List<CommentDto> getPaginatedCommentFromPost(String postId , int pageNumber, int pageLimit) {
        Optional<Post> post = postRepository.findById(postId) ;
        if(post.isEmpty())
            throw new EntityNotFoundException("le post avec l'identifiant " + postId + " n'existe pas") ;

        Page<Comment> page = commentRepository.findCommentsByPost_Id(postId,PageRequest.of(pageNumber,pageLimit));
        return page.get().map(comment -> commentToCommentDto(comment)).toList();
    }

    public CommentDto delete(String commentId){
        Optional<Comment> comment = this.commentRepository.findById(commentId);

        if(comment.isEmpty()){
            throw new EntityNotFoundException("Comment avec identifiant " + commentId + " est inexistant") ;
        }
        this.commentRepository.deleteById(commentId);
        return commentToCommentDto(comment.get()) ;
    }


    public CommentDto update (String commentId ,CreateCommentDto createCommentDto) {

        Optional<Comment> originalComment = this.commentRepository.findById(commentId);
        if(originalComment.isEmpty())
            throw new IllegalArgumentException("Comment id is wrong") ;

        originalComment.get().setContent(createCommentDto.getContent());

        this.commentRepository.save(originalComment.get());
        return  commentToCommentDto(originalComment.get()) ;
    }
}
