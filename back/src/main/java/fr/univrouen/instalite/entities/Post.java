package fr.univrouen.instalite.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table (name = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String path;

    private String title;

    private String description;

    private boolean isPublic;

    private POST_TYPE postType;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private enum POST_TYPE{
        IMAGE
    }
}
