package fr.univrouen.instalite.services;

import fr.univrouen.instalite.dtos.ResponseUser;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.entities.PasswordReset;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void deleteOneUser(Long userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new Exception("This user does not exist in our database");
        }

        userRepository.delete(optionalUser.get());
    }

    public List<ResponseUser> getAllNoneAdminUsers() {
        List<User> users = userRepository.getAllNoneAdminUsers();
        List<ResponseUser> responseUsers = new ArrayList<>();

        users.forEach(user -> {
            ResponseUser responseUser = new ResponseUser(
                    user.getId(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail(),
                    user.getRole().getName().name()
            );

            responseUsers.add(responseUser);
        });

        return responseUsers;
    }

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
