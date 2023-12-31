package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.user.*;
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
    public ResponseEntity<String> deleteOneUser(@PathVariable("id") Long id) {
        try {
            userService.deleteOneUser(id);
            return new ResponseEntity<>("Supprimé avec succès", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchByName(@RequestParam(defaultValue = "") String name ) {
        return ResponseEntity.ok(userService.seachUserByName(name)) ;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDashBoardDto> userDashboardInfo() {
        UserDashBoardDto userDashBoardDto =  userService.dashBoardUsersInfo();
        return ResponseEntity.ok(userDashBoardDto);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> getOneUser(@PathVariable(value = "id") Long id) {
        try {
            UserDto user = userService.getOneUser(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
