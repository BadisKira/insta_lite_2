package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.entities.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post,String> {
}
