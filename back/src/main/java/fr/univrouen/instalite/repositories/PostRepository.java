package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.entities.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends ListCrudRepository<Post,String>, PagingAndSortingRepository<Post,String> {
    Optional<List<Post>>  getOptionalPostListByUserId(Long id);
    // List<Post> findByIsPublicFalse();


    Page<Post> findPostsByIsPublicFalse(Pageable pageable);
    Page<Post> findPostsByIsPublicTrue(Pageable pageable);

    //List<Post> findByIsPublicTrue();



}
