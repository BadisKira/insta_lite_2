package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.LoginUserDto;
import fr.univrouen.instalite.dtos.RegisterUserDto;
import fr.univrouen.instalite.entities.ResponseLogin;
import fr.univrouen.instalite.entities.ResponseUser;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.services.AuthenticationService;
import fr.univrouen.instalite.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5173")
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public  ResponseEntity<ResponseUser> register (@RequestBody RegisterUserDto registerUserDto){
        try {
            User registeredUser = authenticationService.signup(registerUserDto);
            ResponseUser responseUser = new ResponseUser(
                    registeredUser.getId(),
                    registeredUser.getFirstname(),
                    registeredUser.getLastname(),
                    registeredUser.getEmail(),
                    registeredUser.getRole().getName().name()
            );

            return new ResponseEntity<>(responseUser, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping(
            path = "/login",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<ResponseLogin> login(@RequestBody LoginUserDto loginUserDto){
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            if (authenticatedUser.getId() == null) {
                throw new Exception("User does not exist");
            }

            ResponseUser responseUser = new ResponseUser(
                    authenticatedUser.getId(),
                    authenticatedUser.getFirstname(),
                    authenticatedUser.getLastname(),
                    authenticatedUser.getEmail(),
                    authenticatedUser.getRole().getName().name()
            );

            String jwtToken = jwtService.generateToken(authenticatedUser);
            ResponseLogin responseLogin = new ResponseLogin(responseUser, jwtToken);

            return new ResponseEntity<>(responseLogin, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
