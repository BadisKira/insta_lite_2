package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.user.LoginUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.services.AuthentificationService;
import fr.univrouen.instalite.services.JWTService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthentificationController {
    private JWTService jwtService;
    private  final AuthentificationService authentificationService ;

    public AuthentificationController(JWTService jwtService , AuthentificationService authentificationService){
        this.authentificationService = authentificationService;
        this.jwtService = jwtService;
    }


    @PostMapping("/register")
    public  ResponseEntity<User> register (@RequestBody RegisterUserDto registerUserDto){
        User registeredUser = authentificationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUserDto loginUserDto){
        User authenticatedUser = authentificationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        return ResponseEntity.ok(jwtToken);
    }

}
