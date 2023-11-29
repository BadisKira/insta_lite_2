package fr.univrouen.instalite.entities;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table (name = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

}