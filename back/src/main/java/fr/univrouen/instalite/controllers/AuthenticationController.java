package fr.univrouen.instalite.controllers;


import fr.univrouen.instalite.dtos.user.LoginUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.ResponseLogin;
import fr.univrouen.instalite.dtos.user.UserDto;
import fr.univrouen.instalite.services.AuthenticationService;
import fr.univrouen.instalite.services.JWTService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthenticationController {
    private final JWTService jwtService;
    private final AuthenticationService authenticationService;

    //Register a user
    @PostMapping("/register")
    public  ResponseEntity<UserDto> register (@RequestBody RegisterUserDto registerUserDto){
        UserDto res = authenticationService.signup(registerUserDto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    //Login a user
    @PostMapping("/login")
    public ResponseEntity<ResponseLogin> login(@RequestBody LoginUserDto loginUserDto){
        UserDto user = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(user);
        ResponseLogin responseLogin = new ResponseLogin(user, jwtToken);
        return new ResponseEntity<>(responseLogin, HttpStatus.OK);
    }
}
