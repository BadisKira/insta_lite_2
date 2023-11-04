package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.repositories.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {
    UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/")
    @PreAuthorize("isAuthenticated()")
    public List<User> getAllUser(){
        return userRepository.findAll();
    }


    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String getADMINMessage(){
        return "U ARE AN ADMIN";
    }

}
