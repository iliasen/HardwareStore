package com.iliasen.server.controllers;

import com.iliasen.server.models.Basket;
import com.iliasen.server.repositories.BasketRepository;
import com.iliasen.server.repositories.UserRepository;
import com.iliasen.server.models.User;
import com.iliasen.server.utils.SecretKeyReader;
import com.iliasen.server.utils.TokenResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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

    private static final String SECRET_KEY = SecretKeyReader.getSecretKey();

    @PostMapping(path = "/registration")
    public ResponseEntity<?> registration(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email или Password отсутвует");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Пользователь с таким email уже зарегистрирован");
        }

        String plainPassword = user.getPassword();
        String hashedPassword = passwordEncoder.encode(plainPassword);
        user.setPassword(hashedPassword);

        Basket basket = new Basket();
        user.setBasket(basket);

        User savedUser = userRepository.save(user);
        basketRepository.save(basket);
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));

        String token = Jwts.builder()
                .claim("id", savedUser.getId())
                .claim("email", savedUser.getEmail())
                .claim("role", savedUser.getRole())
                .signWith(key)
                .compact();
        TokenResponse tokenResponse = new TokenResponse(token);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User credentials) {
        String email = credentials.getEmail();
        String password = credentials.getPassword();

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Пользователь с таким именем не найден");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Неверный пароль");
        }


        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        String token = Jwts.builder()
                .claim("id", user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .signWith(key)
                .compact();
        TokenResponse tokenResponse = new TokenResponse(token);
        return ResponseEntity.ok(tokenResponse);
    }

    @GetMapping(path = "/auth")
    public ResponseEntity<TokenResponse> check(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
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
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            TokenResponse tokenResponse = new TokenResponse(token);
            return ResponseEntity.ok().body(tokenResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
    @GetMapping(path="/{id}")
    public ResponseEntity<?> getUser(@PathVariable Integer id) {
        if(id == null){
            return ResponseEntity.badRequest().body("Нет id");
        }
        User user = userRepository.findById(id).orElse(null);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delBrand(@PathVariable Integer id) {
        try {
            if (id == null) {
                return ResponseEntity.badRequest().body("Error: No ID provided");
            }

            userRepository.deleteById(id);
            return ResponseEntity.ok("User with ID " + id + " deleted");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User with ID " + id + " not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка: Внутренняя ошибка сервера");
        }
    }

    @PutMapping(path = "/change/{id}")
    public ResponseEntity<?> changePassword(@PathVariable Integer id, @RequestBody String oldPassword, @RequestBody String newPassword) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Пользователь не найден");
        }
        User user = optionalUser.get();

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Старый пароль неверен");
        }

        String newHashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(newHashedPassword);
        userRepository.save(user);

        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        String newToken = Jwts.builder()
                .claim("id", user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .signWith(key)
                .compact();

        TokenResponse tokenResponse = new TokenResponse(newToken);
        return ResponseEntity.ok().body(tokenResponse);
    }
}