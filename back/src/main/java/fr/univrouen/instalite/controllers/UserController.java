package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.RegisterUserDto;
import fr.univrouen.instalite.entities.PasswordReset;
import fr.univrouen.instalite.entities.ResponseUser;
import fr.univrouen.instalite.entities.User;
import fr.univrouen.instalite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @PostAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPERUSER')")
    public ResponseEntity<ResponseUser> putUserInfos(
            @PathVariable(value = "id") Long id,
            @RequestBody RegisterUserDto user
    ) {
        try {
            User updatedUser = userService.putUserInfos(id, user);

            ResponseUser responseUser = new ResponseUser(
                    updatedUser.getId(),
                    updatedUser.getFirstname(),
                    updatedUser.getLastname(),
                    updatedUser.getEmail(),
                    updatedUser.getRole().getName().name()
            );

            return new ResponseEntity<>(responseUser, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/reset-password")
    @PreAuthorize("isAuthenticated()")
    @PostAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPERUSER')")
    public ResponseEntity<String> putUserPassword(
            @PathVariable(value = "id") Long id,
            @RequestBody PasswordReset passwordReset
    ) {
        try {
            userService.putUserPassword(id, passwordReset);

            return new ResponseEntity<>("Password reset successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
