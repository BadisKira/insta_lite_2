package fr.univrouen.instalite.entities.like;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class LikeKey implements Serializable {

    @Column(name = "userId")
    Long userId;

    @Column(name = "postId")
    String postId;

}