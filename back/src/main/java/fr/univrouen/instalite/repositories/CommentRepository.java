package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.entities.Comment;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends ListCrudRepository<Comment,String>, PagingAndSortingRepository<Comment,String>
{
  List<Comment> findCommentsByPost_Id(String postId);

}
