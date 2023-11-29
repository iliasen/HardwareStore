package com.iliasen.server.controllers;

import com.iliasen.server.models.*;
import com.iliasen.server.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/order")
public class OrderController {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;

    @Transactional
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order request) {
        try {
            User user = request.getUser();
            String address = request.getAddress();
            String comment = request.getComment();

            user = userRepository.findById(user.getId()).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body("Пользователь не найден");
            }

            Basket basket = basketRepository.findByUserId(user.getId());
            if (basket == null) {
                return ResponseEntity.badRequest().body("Корзина не найдена");
            }

            Order order = new Order();
            order.setUser(user);
            order.setUsername(user.getEmail());
            order.setAddress(address);
            order.setComment(comment);
            orderRepository.save(order);

            List<BasketItem> basketItems = basketItemRepository.findByBasketIdOrderByItemIdAsc(basket.getId());

            for (BasketItem basketItem : basketItems) {
                Item item = basketItem.getItem();
                Integer quantity = basketItem.getQuantity();

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setItem(item);
                orderItem.setQuantity(quantity);
                orderItemRepository.save(orderItem);
            }

            // Очистка корзины
            try {
                basketItemRepository.deleteByBasketId(basket.getId());
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при удалении элементов корзины");
            }

            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllOrdersWithItems() {
        try {
            List<Order> orders = (List<Order>) orderRepository.findAll();
            List<Order> ordersWithItems = new ArrayList<>();

            for (Order order : orders) {
                Order orderWithItems = new Order();
                orderWithItems.setId(order.getId());
                orderWithItems.setUsername(order.getUsername());
                orderWithItems.setAddress(order.getAddress());
                orderWithItems.setComment(order.getComment());
                orderWithItems.setUser(order.getUser());

                List<OrderItem> orderItems = order.getOrderItems();
                List<OrderItem> orderItemsWithItem = new ArrayList<>();

                for (OrderItem orderItem : orderItems) {
                    OrderItem orderItemWithItem = new OrderItem();
                    orderItemWithItem.setId(orderItem.getId());
                    orderItemWithItem.setQuantity(orderItem.getQuantity());

                    Item item = orderItem.getItem();
                    orderItemWithItem.setItem(item);

                    orderItemWithItem.setOrder(orderWithItems);
                    orderItemsWithItem.add(orderItemWithItem);
                }

                orderWithItems.setOrderItems(orderItemsWithItem);
                ordersWithItems.add(orderWithItems);
            }

            return ResponseEntity.ok(ordersWithItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при получении заказов");
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> compliteOrder(@PathVariable Integer id){
        Order order =orderRepository.findById(id).orElse(null);
        if(order == null){
            return ResponseEntity.badRequest().body("Не указан id");
        }
        try {
            orderRepository.deleteById(order.getId());
            return ResponseEntity.ok("Заказ №" + order.getId()+" выполнен");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при удалении элементов корзины");
        }
    }
}
