package fr.univrouen.instalite.repositories;


import fr.univrouen.instalite.entities.like.*;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends ListCrudRepository<Like, LikeKey> {

    List<Like> findLikesByPost_Id(String postId) ;
    Optional<Like> findLikeByPost_IdAndUser_Id(String postId  , Long userId) ;

}
