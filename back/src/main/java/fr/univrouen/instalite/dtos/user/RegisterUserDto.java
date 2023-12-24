package fr.univrouen.instalite.dtos.user;


import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterUserDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
