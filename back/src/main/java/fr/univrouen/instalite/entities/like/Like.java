package fr.univrouen.instalite.entities.like;

import fr.univrouen.instalite.entities.Post;
import fr.univrouen.instalite.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;



@Entity
@Table(name ="postLikes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Like {

    @EmbeddedId
    LikeKey id ;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    User user ;

    @ManyToOne
    @MapsId("postId")
    @JoinColumn(name = "postId")
    Post post ;
}
