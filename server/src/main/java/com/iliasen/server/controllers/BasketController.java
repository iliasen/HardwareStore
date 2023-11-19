package com.iliasen.server.controllers;

import com.iliasen.server.models.Basket;
import com.iliasen.server.repositories.BasketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public @ResponseBody Optional<Basket> getBasket(@PathVariable Integer id){
        return basketRepository.findById(id);
    }
}
