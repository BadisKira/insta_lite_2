package fr.univrouen.instalite.dtos;

import fr.univrouen.instalite.dtos.user.UserDto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseLogin {
    private UserDto user;
    private String token;
}
