package fr.univrouen.instalite.config;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.entities.Role;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.RoleRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

@Component
public class DbPopulation implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DbPopulation(RoleRepository roleRepository , UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.roleRepository = roleRepository ;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.loadRoles();
        this.createAdmin();
    }

    private void loadRoles() {
        RoleEnum[] roleNames = new RoleEnum[] { RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.SUPERUSER };
        Arrays.stream(roleNames).forEach((roleName) -> {
            Optional<Role> optionalRole = roleRepository.findByName(roleName);

            optionalRole.ifPresentOrElse(System.out::println, () -> {
                Role roleToCreate = new Role();
                roleToCreate.setName(roleName);
                roleRepository.save(roleToCreate);
            });
        });
    }
    private void createAdmin() {
       User admin  = new User();
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
        if (optionalRole.isPresent()) {
            // this means the role table is empty IMPOSSIBLE
            admin.setId(0L);
            admin.setFirstname("admin");
            admin.setLastname("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(this.passwordEncoder.encode("admin"));
            admin.setRole(optionalRole.get());
            userRepository.save(admin);
        }
    }


}
