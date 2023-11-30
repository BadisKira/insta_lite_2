package fr.univrouen.instalite.controllers;


import fr.univrouen.instalite.dtos.user.LoginUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.ResponseLogin;
import fr.univrouen.instalite.dtos.ResponseUser;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.services.AuthenticationService;
import fr.univrouen.instalite.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
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
                    registerUserDto.getFirstname(),
                    registerUserDto.getLastname(),
                    registerUserDto.getEmail()
            );

            return new ResponseEntity<>(responseUser, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<ResponseLogin> login(@RequestBody LoginUserDto loginUserDto){
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);
            ResponseUser responseUser = new ResponseUser(
                    authenticatedUser.getId(),
                    authenticatedUser.getFirstname(),
                    authenticatedUser.getLastname(),
                    authenticatedUser.getEmail()
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
