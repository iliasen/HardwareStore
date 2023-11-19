package com.iliasen.server.controllers;

import com.iliasen.server.models.Basket;
import com.iliasen.server.models.UserCredentials;
import com.iliasen.server.repositories.BasketRepository;
import com.iliasen.server.repositories.UserRepository;
import com.iliasen.server.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.crypto.SecretKey;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/user")
public class UserController {
    private final UserRepository userRepository;
    private final BasketRepository basketRepository;
    private final PasswordEncoder passwordEncoder;
    @PostMapping(path = "/registration")
    public @ResponseBody String registration(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return "Email или Password отсутвует";
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Пользователь с таким email уже зарегистрирован";
        }

        String plainPassword = user.getPassword();
        String hashedPassword = passwordEncoder.encode(plainPassword);
        user.setPassword(hashedPassword);

        Basket basket = new Basket();
        user.setBasket(basket);

        User savedUser = userRepository.save(user);
        basketRepository.save(basket);

        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String token = Jwts.builder()
                .claim("id", savedUser.getId())
                .claim("email", savedUser.getEmail())
                .claim("role", savedUser.getRole())
                .signWith(key)
                .compact();

        return token;
    }

    @PostMapping(path = "/login")
    public @ResponseBody String login(@RequestBody UserCredentials credentials) {
        String email = credentials.getEmail();
        String password = credentials.getPassword();

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Пользователь с таким именем не найден");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Неверный пароль");
        }

        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String token = Jwts.builder()
                .claim("id", user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .signWith(key)
                .compact();

        return token;
    }

    @PostMapping(path = "/check")
    public ResponseEntity<String> check(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Недействительный токен");
        }

        token = token.substring(7);
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Integer userId = claims.get("id", Integer.class);
            String email = claims.get("email", String.class);
            String role = claims.get("role", String.class);

            User user = userRepository.findById(userId).orElse(null);
            if (user == null || !user.getEmail().equals(email) || !user.getRole().equals(role)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Недействительный токен");
            }

            // требуемые действия(если надо)

            return ResponseEntity.ok().body("{\"message\": \"Токен действителен\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Недействительный токен");
        }
    }

    @GetMapping
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
    @GetMapping(path="/{id}")
    public @ResponseBody Optional<User> getUser(@PathVariable Integer id) {
        return userRepository.findById(id);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody String delUser(@PathVariable Integer id){
        if(id == null){
            return "Error, no id";
        }
        userRepository.deleteById(id);
        return "User with id: "+ id + " deleted";
    }

    //@PutMapping
}