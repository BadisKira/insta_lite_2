package fr.univrouen.instalite.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUser {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String role;

}
