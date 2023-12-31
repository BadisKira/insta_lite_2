package fr.univrouen.instalite.dtos.user;

import lombok.*;

@Data
@AllArgsConstructor
@Setter
@Getter
@ToString
public class UserDashBoardDto {
    private Long countAdmins;
    private Long countUsers;
    private Long countSuperUsers ;
}
