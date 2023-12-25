package fr.univrouen.instalite.services;
import fr.univrouen.instalite.dtos.user.LoginUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.entities.Role;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.RoleRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository ;

    @Autowired
    public AuthenticationService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
    }

    public User signup(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);
        if (optionalRole.isEmpty()) {
            // this means the role table is empty IMPOSSIBLE
            return null;
        }
        User user = new User() ;
        user.setEmail(input.getEmail());
        user.setLastname(input.getLastname());
        user.setFirstname(input.getFirstname());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(optionalRole.get());

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) throws Exception {

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );

        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

        if (optionalUser.isEmpty()) {
            throw new Exception("User does not exist");
        }

        return optionalUser.get();
    }
}
