package com.iliasen.server.repositories;

import com.iliasen.server.models.BasketItem;
import org.springframework.data.repository.CrudRepository;

public interface BasketItemRepository extends CrudRepository<BasketItem, Integer> {
}
