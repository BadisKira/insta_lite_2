package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmailIgnoreCase(String email);

        @Query("SELECT u FROM User u WHERE u.role.name <> 'ADMIN' AND (u.firstname LIKE %:name% OR u.lastname LIKE %:name%)")
        Optional<List<User>> findUsersByUsernameContainingOrLastnameContaining(@Param("name") String name);


        @Query("SELECT u FROM User u WHERE u.role.name != 'ADMIN'")
        List<User> getAllNoneAdminUsers();

        Optional<Long> countUsersByRoleIs(RoleEnum roleEnum) ;
}
