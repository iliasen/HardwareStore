package com.iliasen.server.repositories;

import com.iliasen.server.models.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Integer> {
}
