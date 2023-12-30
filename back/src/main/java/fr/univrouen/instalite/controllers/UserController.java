package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.user.CreateUserDto;
import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.user.UserDto;
import fr.univrouen.instalite.dtos.user.PasswordResetDto;
import fr.univrouen.instalite.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOneUser(@PathVariable("id") Long id) {
        userService.deleteOneUser(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> postOneUser(@RequestBody CreateUserDto user) {
            UserDto createdUser = userService.postOneUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> putOneUser(@PathVariable("id") Long id, @RequestBody UserDto user) {
        UserDto updatedUser = userService.putOneUserById(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping( "/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllNoneAdminUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDto> putUserInfos(Authentication authentication, @RequestBody RegisterUserDto user){
        UserDto updatedUser = userService.putUserInfos(authentication.getName(), user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/reset-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> putUserPassword(Authentication authentication,
                                                  @RequestBody PasswordResetDto passwordReset){
        userService.putUserPassword(authentication.getName(), passwordReset);
        return ResponseEntity.ok("Password reset successfully");
    }
}
