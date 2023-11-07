package fr.univrouen.instalite.config;


import fr.univrouen.instalite.filters.JWTAuthentificationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity(jsr250Enabled = true , securedEnabled = true , prePostEnabled = true)
public class SecurityConfig {
    private final JWTAuthentificationFilter jwtAuthentificationFilter;
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:*"));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws  Exception {
        CsrfTokenRequestAttributeHandler csrfTokenRequestHandler = new CsrfTokenRequestAttributeHandler();
        csrfTokenRequestHandler.setCsrfRequestAttributeName("_csrf");

        http
                .csrf((csrf) -> csrf.disable())
//                .csrf((csrf) -> csrf
//                        .csrfTokenRequestHandler(csrfTokenRequestHandler)
//                        .ignoringRequestMatchers("les pages a ne pas inclure dans la protection csrf")
//                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                        .and().addFilterAfter(new CsrfFilter(), BasicAuthenticationFilter.class)
//                ) ;

                .authorizeRequests((requests)->requests
                        .requestMatchers("/api/login","/api/register").permitAll()
                        .requestMatchers("/api/**").authenticated()
                )

                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
//                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthentificationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
/**
 * cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
 *             @Override
 *             public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
 *                 CorsConfiguration corsConfiguration = new CorsConfiguration() ;
 *                 corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
 *                 corsConfiguration.setAllowCredentials(true);
 *                 corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
 *                 corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
 *                 corsConfiguration.setMaxAge(336600L);
 *                 return corsConfiguration;
 *             }
 *         }))

 */