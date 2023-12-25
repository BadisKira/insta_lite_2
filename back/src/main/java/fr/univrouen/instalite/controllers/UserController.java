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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @PostAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteOneUser(@PathVariable("id") Long id) {
        userService.deleteOneUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping( "/")
    @PreAuthorize("isAuthenticated()")
    @PostAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllNoneAdminUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @PostAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPERUSER')")
    public ResponseEntity<UserDto> putUserInfos(@PathVariable("id") Long id,
                                                @RequestBody RegisterUserDto user){
        UserDto updatedUser = userService.putUserInfos(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{id}/reset-password")
    @PreAuthorize("isAuthenticated()")
    @PostAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPERUSER')")
    public ResponseEntity<String> putUserPassword(@PathVariable(value = "id") Long id,
                                                  @RequestBody PasswordReset passwordReset){
        userService.putUserPassword(id, passwordReset);
        return ResponseEntity.ok("Password reset successfully");
    }


}
