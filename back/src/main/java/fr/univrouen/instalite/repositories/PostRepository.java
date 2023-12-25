package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.entities.Post;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends ListCrudRepository<Post,String>, PagingAndSortingRepository<Post,String> {
    Optional<List<Post>>  getOptionalPostListByUserId(Long id);
    List<Post> findByIsPublicFalse();
    List<Post> findByIsPublicTrue();



}
