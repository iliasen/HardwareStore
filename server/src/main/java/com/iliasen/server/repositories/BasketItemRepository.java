package com.iliasen.server.repositories;


import com.iliasen.server.models.BasketItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BasketItemRepository extends CrudRepository<BasketItem, Integer> {
    BasketItem findByBasketIdAndItemId(Integer id, Integer id1);

    List<BasketItem> findByBasketIdOrderByItemIdAsc(Integer id);
}
