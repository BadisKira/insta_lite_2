package fr.univrouen.instalite.services;
import fr.univrouen.instalite.dtos.user.LoginUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.dtos.user.UserDto;
import fr.univrouen.instalite.entities.Role;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.exceptions.RoleDoesNotExistInDbException;
import fr.univrouen.instalite.exceptions.UserAlreadyExistsException;
import fr.univrouen.instalite.exceptions.UserNotFoundException;
import fr.univrouen.instalite.repositories.RoleRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    public UserDto signup(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);
        if (optionalRole.isEmpty())
            throw new RoleDoesNotExistInDbException();

        Optional<User> checkUser = userRepository.findByEmailIgnoreCase(input.getEmail());

        if(checkUser.isPresent())
            throw new UserAlreadyExistsException();

        User user = new User();
        user.setEmail(input.getEmail());
        user.setLastname(input.getLastname());
        user.setFirstname(input.getFirstname());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(optionalRole.get());
        userRepository.save(user);

        return modelMapper.map(user, UserDto.class);
    }

    public UserDto authenticate(LoginUserDto input){
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );

        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(input.getEmail());

        if (optionalUser.isEmpty())
            throw new UserNotFoundException();

        return modelMapper.map(optionalUser.get(), UserDto.class);
    }
}
