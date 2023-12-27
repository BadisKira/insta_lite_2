package fr.univrouen.instalite.dtos.user;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateUserDto {
    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private String role;
}
