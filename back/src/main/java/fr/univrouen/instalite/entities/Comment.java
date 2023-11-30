package fr.univrouen.instalite.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;


@Entity
@Table(name = "comments")
public class Comment  {

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user ;
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
    @Column(name = "content" , nullable = false , length = 255)
    private String content;
    @Column(name = "createdAt" , nullable = false )
    private Date createdAt ;

    public Comment(){}
    public Comment(String id, User user, Post post, String content, Date createdAt) {
        this.id = id;
        this.user = user;
        this.post = post;
        this.content = content;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
