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
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> postOneUser(@RequestBody CreateUserDto user) {
        try {
            UserDto createdUser = this.userService.postOneUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> putOneUser(@PathVariable("id") Long id, @RequestBody UserDto user) {
        try {
            UserDto updatedUser = userService.putOneUserById(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping( "/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            List<UserDto> users = userService.getAllNoneAdminUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDto> putUserInfos(Authentication authentication, @RequestBody RegisterUserDto user){
        try {
            UserDto updatedUser = userService.putUserInfos(authentication.getName(), user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/reset-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> putUserPassword(Authentication authentication,
                                                  @RequestBody PasswordResetDto passwordReset){
        try {
            userService.putUserPassword(authentication.getName(), passwordReset);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Password do not match", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
