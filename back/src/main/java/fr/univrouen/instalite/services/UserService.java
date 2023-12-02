package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.RegisterUserDto;
import fr.univrouen.instalite.entities.PasswordReset;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User putUserInfos(Long id, RegisterUserDto userDto) throws Exception {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new Exception("This user is does not exist in our database");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new Exception("Password do not match");
        }
        
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setEmail(user.getEmail());

        return user;
    }

    @Transactional
    public void putUserPassword(Long id, PasswordReset passwordReset) throws Exception {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new Exception("This user is does not exist in our database");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(passwordReset.getOldPassword(), user.getPassword())) {
            throw new Exception("Password do not match");
        }

        String newEncodedPassword = passwordEncoder.encode(passwordReset.getNewPassword());

        user.setPassword(newEncodedPassword);
    }

}
