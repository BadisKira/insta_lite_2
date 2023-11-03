package fr.univrouen.instalite.config;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:8080"));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }

    @Bean
    SecurityFilterChain defaSecurityFilterChain(HttpSecurity http) throws  Exception {
        CsrfTokenRequestAttributeHandler csrfTokenRequestHandler = new CsrfTokenRequestAttributeHandler();
        csrfTokenRequestHandler.setCsrfRequestAttributeName("_csrf");

        http
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

                .csrf((csrf) -> csrf.disable())
//                .csrf((csrf) -> csrf
//                        .csrfTokenRequestHandler(csrfTokenRequestHandler)
//                        .ignoringRequestMatchers("les pages a ne pas inclure dans la protection csrf")
//                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                        .and().addFilterAfter(new CsrfFilter(), BasicAuthenticationFilter.class)
//                ) ;

                .authorizeRequests((requests)->requests
                        /**
                         * Authority is like a single individual privilege give
                         * the ability to restrict access in a fine grained manner
                         * */
                //        .requestMatchers("").hasAnyAuthority("")
                                /**
                                 * Role is like a set of authorities
                                 * */
                //        .requestMatchers("").hasRole("")
                        .requestMatchers("/api/login","/api/register").permitAll()
                        //.requestMatchers("").authenticated()
                );
        return http.build();
    }

}
