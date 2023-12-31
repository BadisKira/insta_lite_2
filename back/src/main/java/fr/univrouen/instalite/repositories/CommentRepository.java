package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends ListCrudRepository<Comment,String>, PagingAndSortingRepository<Comment,String>
{
  Page<Comment> findCommentsByPost_Id(String postId , PageRequest pageRequest);
  Integer countCommentsByPost_Id(String postId);
  void deleteCommentsByPost_Id(String postId) ;


}
