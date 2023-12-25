package fr.univrouen.instalite.services;

import org.springframework.stereotype.Service;

import fr.univrouen.instalite.entities.Like;
import fr.univrouen.instalite.repositories.LikeRepository;
import fr.univrouen.instalite.repositories.PostRepository;
import fr.univrouen.instalite.repositories.UserRepository;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public LikeService(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    /*public Like likePost(String userId, String postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        Like existingLike = likeRepository.findByUserAndPost(user, post);
        if (existingLike != null) {
            // Si l'utilisateur a déjà liké ce post, tu peux implémenter ici la logique pour gérer cela
            // Par exemple, un utilisateur ne peut liker qu'une seule fois
            // Tu pourrais lancer une exception ou retourner un message disant que l'utilisateur a déjà liké ce post
            // Tu peux aussi implémenter ici la logique pour supprimer un like existant si besoin
            // ...
            return existingLike;
        }

        Like newLike = new Like(user, post, new Date());
        return likeRepository.save(newLike);
    }
*/
}
