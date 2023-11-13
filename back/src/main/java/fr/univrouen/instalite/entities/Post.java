package fr.univrouen.instalite.entities;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table (name = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    private String title;

    private String description;

    private boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public enum POST_TYPE{
        IMAGE,
        VIDOE
    }
}
