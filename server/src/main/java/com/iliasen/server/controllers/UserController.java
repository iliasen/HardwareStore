package com.iliasen.server.controllers;

import com.iliasen.server.models.Basket;
import com.iliasen.server.repositories.BasketRepository;
import com.iliasen.server.repositories.UserRepository;
import com.iliasen.server.models.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/user")
public class UserController {
    private final UserRepository userRepository;
    private final BasketRepository basketRepository;

    @PostMapping(path = "/registration")
    public @ResponseBody User addUser(@RequestBody User user) {
        Basket basket = new Basket();

        user.setBasket(basket);
        User save = userRepository.save(user);

        basketRepository.save(basket);

        return save;
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
        return "User with id: "+id + " deleted";
    }

    //@PutMapping
}