package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.dtos.PostDto;
import fr.univrouen.instalite.entities.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends CrudRepository<Post,String> {
    public Optional<List<Post>>  getOptionalPostListByUserId(Long id);
    List<Post> findByIsPublicFalse();
    List<Post> findByIsPublicTrue();


}
