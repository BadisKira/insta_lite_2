package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.comment.CommentDto;
import fr.univrouen.instalite.dtos.comment.CreateCommentDto;
import fr.univrouen.instalite.services.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService ;

    @PostMapping()
    public ResponseEntity<CommentDto> create(@RequestBody  CreateCommentDto createCommentDto) {
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
            @RequestParam(defaultValue = "1") int pageLimit){
            return ResponseEntity.ok(commentService.getPaginatedCommentFromPost(
                    postId,pageNumber,pageLimit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CommentDto> delete(@PathVariable String id){
        commentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommentDto> update(@PathVariable String id ,
                                             @RequestBody CreateCommentDto createCommentDto) {
        CommentDto commentDto = this.commentService.update(id,createCommentDto);
        return ResponseEntity.accepted().body(commentDto);
    }

}
