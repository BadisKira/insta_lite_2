package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.dtos.comment.CommentCountDto;
import fr.univrouen.instalite.dtos.comment.CommentDashboardDto;
import fr.univrouen.instalite.dtos.comment.CommentDto;
import fr.univrouen.instalite.dtos.comment.CreateCommentDto;
import fr.univrouen.instalite.dtos.user.UserDashBoardDto;
import fr.univrouen.instalite.exceptions.*;
import fr.univrouen.instalite.entities.Comment;
import fr.univrouen.instalite.entities.Post;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.CommentRepository;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService {
    private PostRepository postRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;
    private ModelMapper modelMapper;

    public CommentDto createComment(String email, CreateCommentDto createCommentDto){
        Optional<User> user = userRepository.findByEmailIgnoreCase(email);

        if(user.isEmpty())
            throw new UserNotFoundException();

        Optional<Post> post = postRepository.findById(createCommentDto.getPostId());

        if(post.isEmpty())
            throw new PostNotFoundException();

        if(createCommentDto.getContent().replaceAll(" ","").equals(""))
            throw new CommentHasNoContentException();

        Date actualDate = Date.from(Instant.now());

        Comment comment = new Comment(
                null,
                user.get(),
                post.get(),
                createCommentDto.getContent(),
                actualDate
        );
        commentRepository.save(comment);
        return modelMapper.map(comment, CommentDto.class);
    }

    public List<CommentDto> getPaginatedCommentFromPost(String postId , int pageNumber, int pageLimit) {
        Optional<Post> post = postRepository.findById(postId);

        if(post.isEmpty())
            throw new PostNotFoundException();

        Page<Comment> page = commentRepository.findCommentsByPost_Id(postId,PageRequest.of(pageNumber,pageLimit));
        return page.get().map(comment -> modelMapper.map(comment, CommentDto.class)).toList();
    }

    public void delete(String commentId){
        Optional<Comment> comment = this.commentRepository.findById(commentId);

        if(comment.isEmpty())
            throw new CommentNotFoundException();

        commentRepository.deleteById(commentId);

    }


    public CommentDto update (String commentId ,CreateCommentDto createCommentDto) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isEmpty())
            throw new CommentNotFoundException();

        comment.get().setContent(createCommentDto.getContent());
        commentRepository.save(comment.get());
        return  modelMapper.map(comment, CommentDto.class);
    }

    public CommentCountDto getCount(String postId) {
        return new CommentCountDto(commentRepository.countCommentsByPost_Id(postId));
    }

    public CommentDashboardDto dashBoardCommentsInfo() {
        //private Long mostCommentsPost ;
        //private Long allComments ;
        Long counts  = commentRepository.count();
        Optional<Long> countsForMostCommentedPost = postRepository.maxCommentsForAnyPost();
        Optional<Long> countsForAverageCommentsByPost = postRepository.averageCommentsForAnyPost() ;

        CommentDashboardDto commentDashboardDto =  new CommentDashboardDto(countsForMostCommentedPost.get() , countsForAverageCommentsByPost.get() , counts) ;
        System.out.println(commentDashboardDto.toString());

        return commentDashboardDto;

    }
}
