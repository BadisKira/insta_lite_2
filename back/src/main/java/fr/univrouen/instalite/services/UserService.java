package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.user.UserDto;
import fr.univrouen.instalite.dtos.user.PasswordResetDto;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.exceptions.PasswordDoesNotMatchException;
import fr.univrouen.instalite.exceptions.UserNotFoundException;
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

}
