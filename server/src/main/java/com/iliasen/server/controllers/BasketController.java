package com.iliasen.server.controllers;

import com.iliasen.server.models.Basket;
import com.iliasen.server.models.User;
import com.iliasen.server.repositories.BasketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/basket")
public class BasketController {
    private final BasketRepository basketRepository;
    @GetMapping
    public @ResponseBody Iterable<Basket> getAllBaskets() {
        return basketRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<Basket> getBasket(@RequestBody Integer id){
        return basketRepository.findById(id);
    }
}
