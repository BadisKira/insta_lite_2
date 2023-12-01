package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.comment.CommentDto;
import fr.univrouen.instalite.dtos.comment.CreateCommentDto;
import fr.univrouen.instalite.dtos.exception.BadRequestException;
import fr.univrouen.instalite.dtos.post.PostCreatedDto;
import fr.univrouen.instalite.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {


    private CommentService commentService ;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }


    @PostMapping()
    public ResponseEntity<CommentDto> create(@RequestBody  CreateCommentDto createCommentDto) throws BadRequestException {
        System.out.println("Controller comment create  " + createCommentDto.toString());
        CommentDto commentDto = commentService.createComment(createCommentDto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }

    /**
     *
     * @GetMapping("/{postId}")
     *     public ResponseEntity<List<CommentDto>> get(@PathVariable String postId) {
     *
     *         List<CommentDto> commentDtoList = this.commentService.getCommentFromPost(postId);
     *         return  ResponseEntity.status(HttpStatus.OK).body(commentDtoList);
     *     }
     * */

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentDto>> getPaginated(
            @PathVariable String postId,
            @RequestParam(defaultValue = "0") int pageNumber,
                                                         @RequestParam(defaultValue = "1") int pageLimit)
    {
            return  ResponseEntity.status(HttpStatus.OK).body(this.commentService.getPaginatedCommentFromPost(postId,pageNumber,pageLimit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CommentDto> delete(@PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK).body(this.commentService.delete(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommentDto> update(@PathVariable String id , @RequestBody CreateCommentDto createCommentDto) {
        CommentDto commentDto = this.commentService.update(id,createCommentDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(commentDto);
    }

}
