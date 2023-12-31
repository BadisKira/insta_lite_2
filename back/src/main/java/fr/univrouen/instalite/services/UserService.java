package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.RoleEnum;
import fr.univrouen.instalite.dtos.user.*;
import fr.univrouen.instalite.entities.Role;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.exceptions.CanNotCreateAdminUserException;
import fr.univrouen.instalite.exceptions.PasswordDoesNotMatchException;
import fr.univrouen.instalite.exceptions.RoleDoesNotExistInDbException;
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

    public UserDto getOneUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalUser.isEmpty())
            throw new UserNotFoundException();

        return modelMapper.map(optionalUser.get(), UserDto.class);
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

    public UserDto postOneUser(CreateUserDto newUser){
        //ToDo : review this
        if (newUser.getRole().equals("ADMIN"))
            throw new CanNotCreateAdminUserException();

        RoleEnum roleEnum = (newUser.getRole().equals("USER")) ? RoleEnum.USER : RoleEnum.SUPERUSER;
        Optional<Role> optionalRole = this.roleRepository.findByName(roleEnum);

        if (optionalRole.isEmpty()) throw new RoleDoesNotExistInDbException();

        String hashedPassword = passwordEncoder.encode(newUser.getPassword());

        User user = modelMapper.map(newUser, User.class);
        user.setPassword(hashedPassword);
        user.setRole(optionalRole.get());

        User createdUser = userRepository.save(user);

        return modelMapper.map(createdUser, UserDto.class);
    }

    @Transactional
    public UserDto putOneUserById(Long userId, UserDto user) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalUser.isEmpty())
            throw new UserNotFoundException();

        //ToDo : review this
        if (user.getRole().equals("ADMIN"))
            throw new CanNotCreateAdminUserException();

        RoleEnum roleEnum = (user.getRole().equals("USER")) ? RoleEnum.USER : RoleEnum.SUPERUSER;
        Optional<Role> optionalRole = this.roleRepository.findByName(roleEnum);

        User retreivedUser = optionalUser.get();
        retreivedUser.setFirstname(user.getFirstname());
        retreivedUser.setLastname(user.getLastname());
        retreivedUser.setEmail(user.getEmail());
        retreivedUser.setRole(optionalRole.orElseThrow());

        return modelMapper.map(retreivedUser, UserDto.class);
    }


    public List<UserDto> seachUserByName(String name) {
        Optional<List<User>> users = userRepository.findUsersByUsernameContainingOrLastnameContaining(name) ;
        return users.get().stream().map(x -> modelMapper.map(x, UserDto.class)).toList();
    }


    public UserDashBoardDto dashBoardUsersInfo() {
        List<User> users = userRepository.findAll();
        long adminCount = users.stream().filter(x -> x.getRole().getName() == RoleEnum.ADMIN).count();
        long userCount = users.stream().filter(x -> x.getRole().getName() == RoleEnum.USER).count();
        long superUserCount = users.stream().filter(x -> x.getRole().getName() == RoleEnum.SUPERUSER).count();

        return new UserDashBoardDto(
                adminCount,
                userCount,
                superUserCount);
    }
}
