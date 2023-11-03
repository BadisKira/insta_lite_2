package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.entities.User;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends ListCrudRepository<User, Long> {
        Optional<User> findByEmail(String email);
        List<User> findAll();
}
