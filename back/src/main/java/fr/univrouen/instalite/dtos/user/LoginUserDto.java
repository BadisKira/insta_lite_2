package fr.univrouen.instalite.dtos.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class LoginUserDto {
    private String email;
    private String password;
}
