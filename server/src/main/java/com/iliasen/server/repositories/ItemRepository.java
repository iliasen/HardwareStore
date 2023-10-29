package com.iliasen.server.repositories;

import com.iliasen.server.models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {
}
