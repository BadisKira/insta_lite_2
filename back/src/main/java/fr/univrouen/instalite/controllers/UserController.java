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
    public String getMessageForEveryOne(){
        return "this message could be seen by anyone";
    }

    @GetMapping("/knownuser")
    @PreAuthorize("isAuthenticated()")
    public String getMessageForAuthenticatedUsers(){
        return "this message could only be seen by authenticated users";
    }


    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String getADMINMessage(){
        return "only admins can see this ";
    }

    @GetMapping("/admin2")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getADMINMessage2(){
        return "only admins can see this 2";
    }

}
