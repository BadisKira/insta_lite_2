package fr.univrouen.instalite.entities;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class Post {
    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;
    private String title;
    private String description;
    private String extension;
    private String postType;
    private boolean isPublic ;
    @Column(name = "createdAt" , updatable = false )
    private Date createdAt  ;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "post" , cascade = CascadeType.REMOVE)
    private List<Comment> commentList  ;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "post_like",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")

    )
    private List<User> likedUsers = new ArrayList<>();


    @Transactional
    public void deleteAllLikes () {
        this.likedUsers.clear();
    }

}