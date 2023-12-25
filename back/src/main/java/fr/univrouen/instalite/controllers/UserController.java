package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.user.RegisterUserDto;
import fr.univrouen.instalite.dtos.user.UserDto;
import fr.univrouen.instalite.entities.PasswordReset;
import fr.univrouen.instalite.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
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
    public ResponseEntity<String> deleteOneUser(@PathVariable("id") Long id) {
        userService.deleteOneUser(id);
        return ResponseEntity.noContent().build();
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
                                                  @RequestBody PasswordReset passwordReset){
        userService.putUserPassword(authentication.getName(), passwordReset);
        return ResponseEntity.ok("Password reset successfully");
    }
}
