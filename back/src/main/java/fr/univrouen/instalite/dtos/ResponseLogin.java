package fr.univrouen.instalite.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseLogin {
    private ResponseUser user;
    private String token;
}
