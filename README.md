# insta_lite_2
Projet m2 j2ee

# Authentication 
## steps : 
1. create User entity
2. create User repostory  add the method findByEmail (String email)
3. extend User entity with authentification details : 
   ```
   Spring security provides an interface named UserDetails with propreties and methods
   that the User entity must override the implementation to manage user details related to 
   authentication

   getAuthorities() returns the user's roles list 
   getUsername() returns the email

   rest of methods return true (must)
   ```
4. create JWT service (i have already installed necessary deps)
    ``` 
    To generate , decode and validate a JWT  
    ```
5. override security configuration by : 
  - creating an AuthentificationConfiguration we override multiple methods see the code 

6. create the authentification middleware : (JwtAuthenticationFilter )
    ```
    for every request we want to retrieve the Authorization header and valide the JWT 
    we extend this class with OncePerRequestFilter to ensure that this verification 
    will occur once every rquest 
    ```

7. create a SecurityConfig classe and override the securityFilterChain method
8. create the Authentification service 
    ```
    we created Dtos (login and register ) to be able to do some verification 
    the authentification service uses : 
      -  UserRepository ;
      -  PasswordEncoder ;
      -  AuthenticationManager ;

    to perfom the register and login of the user
    ```
9. create the Authentification controller to consume the routes /api/login /api/register and use
the Authentification service we create to do the do


# Gestion des roles
1. create Role entity  and role Enum {Admin, user,privilegedUser } and Role repository
2. then store them roles in data base (i'll create a sql file that will be laucnhned before the app)
3. update the User entity to include the role 
4. update the signup methods (add the role when creating)
5. update the getAuthorities methdos 
    ```
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName().toString());    
    return List.of(authority);
    }
    For role-based authorization, Spring Security adds a default ROLE_ prefix to the value given. This is why we concatenate the role's name with "ROLE_".

    ```
6. enable the method scurity of spring security (@EnableMethodSecurity) allow to protect the routes with annotations 
    ```
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> authenticatedUser() {
    	//some bullshit code in here...
    }
    
    ```
