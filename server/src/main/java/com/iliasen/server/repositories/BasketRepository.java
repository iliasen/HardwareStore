package com.iliasen.server.repositories;

import com.iliasen.server.models.Basket;
import org.springframework.data.repository.CrudRepository;

public interface BasketRepository extends CrudRepository<Basket, Integer> {

    Basket findByUserId(Integer userId);
}