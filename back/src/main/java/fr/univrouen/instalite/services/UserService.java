package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.dtos.user.CreateUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.user.UserDto;
import fr.univrouen.instalite.dtos.user.PasswordResetDto;
import fr.univrouen.instalite.entities.Role;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.exceptions.PasswordDoesNotMatchException;
import fr.univrouen.instalite.exceptions.UserNotFoundException;
import fr.univrouen.instalite.repositories.RoleRepository;
import fr.univrouen.instalite.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper modelMapper;

    public void deleteOneUser(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalUser.isEmpty())
            throw new UserNotFoundException();

        userRepository.delete(optionalUser.get());
    }

    public List<UserDto> getAllNoneAdminUsers() {
        List<User> users = userRepository.getAllNoneAdminUsers();
        return users.stream().map(x -> modelMapper.map(x, UserDto.class)).toList();
    }

    @Transactional
    public UserDto putUserInfos(String email, RegisterUserDto userDto){
        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);

        if(optionalUser.isEmpty())
            throw new UserNotFoundException();

        User user = optionalUser.get();

        if(!passwordEncoder.matches(userDto.getPassword(), user.getPassword()))
            throw new PasswordDoesNotMatchException();

        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setEmail(userDto.getEmail());

        return modelMapper.map(user, UserDto.class);
    }

    @Transactional
    public void putUserPassword(String email, PasswordResetDto passwordReset){
        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);

        if(optionalUser.isEmpty())
          throw new UserNotFoundException();

        User user = optionalUser.get();

        if(!passwordEncoder.matches(passwordReset.getOldPassword(), user.getPassword()))
            throw new PasswordDoesNotMatchException();

        String newEncodedPassword = passwordEncoder.encode(passwordReset.getNewPassword());

        user.setPassword(newEncodedPassword);
    }

    public UserDto postOneUser(CreateUserDto newUser) throws Exception {
        if (newUser.getRole().equals("ADMIN")) {
            throw new Exception("Can't create user with admin role");
        }

        RoleEnum roleEnum = (newUser.getRole().equals("USER")) ? RoleEnum.USER : RoleEnum.SUPERUSER;
        Optional<Role> optionalRole = this.roleRepository.findByName(roleEnum);

        if (optionalRole.isEmpty()) throw new Exception("Role doesn't exist");

        String hashedPassword = passwordEncoder.encode(newUser.getPassword());

        User user = modelMapper.map(newUser, User.class);
        user.setPassword(hashedPassword);
        user.setRole(optionalRole.get());

        User createdUser = this.userRepository.save(user);

        return modelMapper.map(createdUser, UserDto.class);
    }

    @Transactional
    public UserDto putOneUserById(Long userId, UserDto user) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalUser.isEmpty())
            throw new UserNotFoundException();

        if (user.getRole().equals("ADMIN")) {
            throw new Exception("Can't create user with admin role");
        }

        RoleEnum roleEnum = (user.getRole().equals("USER")) ? RoleEnum.USER : RoleEnum.SUPERUSER;
        Optional<Role> optionalRole = this.roleRepository.findByName(roleEnum);

        User retreivedUser = optionalUser.get();
        retreivedUser.setFirstname(user.getFirstname());
        retreivedUser.setLastname(user.getLastname());
        retreivedUser.setEmail(user.getEmail());
        retreivedUser.setRole(optionalRole.orElseThrow());

        return modelMapper.map(retreivedUser, UserDto.class);
    }
}
