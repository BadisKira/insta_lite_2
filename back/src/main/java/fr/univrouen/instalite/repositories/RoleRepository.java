package fr.univrouen.instalite.repositories;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.entities.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role,Long> {

    Optional<Role> findByName(RoleEnum name);
}
