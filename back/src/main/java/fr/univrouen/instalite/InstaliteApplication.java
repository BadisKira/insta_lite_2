package fr.univrouen.instalite;

import fr.univrouen.instalite.dtos.post.PostDto;
import fr.univrouen.instalite.entities.Comment;
import fr.univrouen.instalite.entities.Post;
import fr.univrouen.instalite.entities.Role;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class InstaliteApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaliteApplication.class, args);
	}

	@Bean
	public ModelMapper getModelMapper() {
		ModelMapper mm = new ModelMapper();
		Converter<Role, String> roleToStringConverter = new Converter<Role, String>() {
			@Override
			public String convert(MappingContext<Role, String> context) {
				return context.getSource().getName().name();
			}
		};
		Converter<Post, PostDto> postConverter = new Converter<Post, PostDto>()
		{
			public PostDto convert(MappingContext<Post, PostDto> context)
			{
				Post s = context.getSource();
				PostDto d = context.getDestination();
				d.setId(s.getId());
				d.setTitle(s.getTitle());
				d.setDescription(s.getDescription());
				d.setPublic(s.isPublic());
				d.setCreatedAt(s.getCreatedAt());
				d.setUserId(s.getUser().getId());
				d.setUserFirstname(s.getUser().getFirstname());
				d.setUserLastname(s.getUser().getLastname());
				d.setCommentsNumber(s.getCommentList().size());
				d.setLikedUserIds(s.getLikes().stream().map(
						l -> l.getUser().getId()).toList());
				return d;
			}
		};

		mm.addConverter(roleToStringConverter);
		mm.addConverter(postConverter);
		return mm;
	}
}
