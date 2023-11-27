package com.iliasen.server.controllers;

import com.iliasen.server.models.Item;
import com.iliasen.server.models.Rating;
import com.iliasen.server.models.User;
import com.iliasen.server.repositories.ItemRepository;
import com.iliasen.server.repositories.RatingRepository;
import com.iliasen.server.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/rating")
public class RatingController {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @PostMapping("/{itemId}")
    public ResponseEntity<Rating> createRating(HttpServletRequest request, @PathVariable("itemId") Integer itemId, @RequestBody Rating req) {
        String token = getTokenFromAuthorizationHeader(request);
        Integer userId = getUserIdFromToken(token);
        Rating rating = ratingRepository.findByUserIdAndItemId(userId, itemId);

        User user = userRepository.findById(userId).orElse(null);
        Item item = itemRepository.findById(itemId).orElse(null);

        if (rating != null) {
            rating.setRate(req.getRate());
            rating.setFeedback(req.getFeedback());
            ratingRepository.save(rating);
            return ResponseEntity.ok(rating);
        } else {
            rating = new Rating();
            rating.setRate(req.getRate());
            rating.setFeedback(req.getFeedback());
            rating.setUser(user);
            rating.setItem(item);
            ratingRepository.save(rating);
            return ResponseEntity.ok(rating);
        }
    }

    @GetMapping(path = "/{itemId}")
    private ResponseEntity<?> getAll(@PathVariable("itemId") Integer itemId){
        Item item = itemRepository.findById(itemId).orElse(null);

        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        Iterable<Rating> ratings = ratingRepository.findByItemId(itemId);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping(path = "/average/{itemId}")
    public ResponseEntity<?> getAverage(@PathVariable("itemId") Integer itemId){
        Item item = itemRepository.findById(itemId).orElse(null);

        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        Iterable<Rating> ratings = ratingRepository.findByItemId(itemId);
        int count = 0;
        int sum = 0;
        for (Rating rating : ratings) {
            sum += rating.getRate();
            count++;
        }

        if (count > 0) {
            float average = (float) sum / count;
            return ResponseEntity.ok(average);
        } else {
            return ResponseEntity.ok(0f);
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> delRating(HttpServletRequest request, @PathVariable("itemId") Integer itemId, @RequestBody Rating req) {
        String token = getTokenFromAuthorizationHeader(request);
        Integer userId = getUserIdFromToken(token);

        Rating rating = ratingRepository.findByUserIdAndItemId(userId, itemId);
        if(rating == null){
            return ResponseEntity.notFound().build();
        }
        ratingRepository.deleteById(rating.getId());
        return ResponseEntity.ok("Рейтинг удалён");
    }

    private String getTokenFromAuthorizationHeader(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            return "Нет токена";
        }
        token = token.substring(7);
        return token;
    }

    private Integer getUserIdFromToken(String token) {
        // Реализуйте получение идентификатора пользователя из токена
        String SECRET_KEY = "CdapQnXz5hLBVbONLlcAeCIIF09HAlJsCQ/MHM0MlcY=";
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Integer userId = claims.get("id", Integer.class);
        return userId;
    }
}
