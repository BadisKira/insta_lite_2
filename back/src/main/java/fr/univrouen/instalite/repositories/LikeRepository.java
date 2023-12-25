package fr.univrouen.instalite.repositories;

import org.springframework.data.repository.ListCrudRepository;

import fr.univrouen.instalite.entities.Like;

public interface LikeRepository extends ListCrudRepository<Like , String>{
    
}
