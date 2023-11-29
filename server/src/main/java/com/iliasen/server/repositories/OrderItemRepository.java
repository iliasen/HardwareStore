package com.iliasen.server.repositories;

import com.iliasen.server.models.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemRepository extends CrudRepository<OrderItem,Integer> {
}
