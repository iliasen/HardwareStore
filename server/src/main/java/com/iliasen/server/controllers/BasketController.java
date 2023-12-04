package com.iliasen.server.controllers;

import com.iliasen.server.models.Basket;
import com.iliasen.server.models.BasketItem;
import com.iliasen.server.models.Item;
import com.iliasen.server.repositories.BasketItemRepository;
import com.iliasen.server.repositories.BasketRepository;
import com.iliasen.server.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/basket")
public class BasketController {
    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;
    private final ItemRepository itemRepository;

    @PostMapping(path = "/{userId}/{itemId}")
    public ResponseEntity<String> addItemToBasket(@PathVariable Integer userId, @PathVariable Integer itemId, @RequestBody Map<String, Integer> requestBody) {
        try {
            Integer quantity = requestBody.get("quantity");
            Basket basket = basketRepository.findById(userId).orElseGet(() -> {
                Basket newBasket = new Basket();
                newBasket.setId(userId);
                return basketRepository.save(newBasket);
            });

            Item item = itemRepository.findById(itemId).orElse(null);

            if (item == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка. Заданный товар не найден");
            }

            // Найти запись в таблице связей между корзиной и товаром
            BasketItem basketItem = basketItemRepository.findByBasketIdAndItemId(basket.getId(), item.getId());

            // Если запись существует, увеличить количество товара на заданное значение
            if (basketItem != null) {
                basketItem.setQuantity(basketItem.getQuantity() + quantity);
                basketItemRepository.save(basketItem);
            } else {
                // Иначе создать новую запись с заданным количеством
                basketItem = new BasketItem();
                basketItem.setBasket(basket);
                basketItem.setItem(item);
                basketItem.setQuantity(quantity);
                basketItemRepository.save(basketItem);
            }

            return ResponseEntity.ok("Товар добавлен в корзину");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getItemsFromBasket(@PathVariable Integer userId) {
        try {
            Basket basket = basketRepository.findById(userId).orElse(null);

            if (basket == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonList(Map.of("message", "Ошибка. Корзина с заданным id не найдена")));
            }

            List<BasketItem> basketItems = basketItemRepository.findByBasketIdOrderByItemIdAsc(basket.getId());
            List<Map<String, Object>> itemsWithQuantity = new ArrayList<>();

            for (BasketItem basketItem : basketItems) {
                Map<String, Object> itemWithQuantity = new HashMap<>();
                Item item = basketItem.getItem();
                itemWithQuantity.put("id", item.getId());
                itemWithQuantity.put("name", item.getName());
                itemWithQuantity.put("price", item.getPrice());
                itemWithQuantity.put("quantity", basketItem.getQuantity());
                itemWithQuantity.put("img", item.getImg());
                itemWithQuantity.put("about", item.getAbout());
                itemWithQuantity.put("type", item.getType());
                itemWithQuantity.put("brand", item.getBrand());
                itemsWithQuantity.add(itemWithQuantity);
            }

            return ResponseEntity.ok(itemsWithQuantity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonList(Map.of("message", e.getMessage())));
        }
    }

    @DeleteMapping("/{userId}/{itemId}")
    public ResponseEntity<String> removeItemFromBasket(@PathVariable Integer userId, @PathVariable Integer itemId) {
        try {
            BasketItem basketItem = basketItemRepository.findByBasketIdAndItemId(userId, itemId);

            if (basketItem == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка. Корзина с заданными параметрами не найдена");
            }

            basketItemRepository.delete(basketItem);

            return ResponseEntity.ok("Товар удален");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{userId}/{itemId}")
    public ResponseEntity<String> updateItemQuantityInBasket(@PathVariable Integer userId, @PathVariable Integer itemId, @RequestBody Map<String, Integer> requestBody) {
        try {
            int quantity = requestBody.get("quantity");

            BasketItem basketItem = basketItemRepository.findByBasketIdAndItemId(userId, itemId);

            if (basketItem == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка. Корзина с заданным id не найдена");
            }

            basketItem.setQuantity(quantity);
            basketItemRepository.save(basketItem);

            return ResponseEntity.ok("Количество товара изменено");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }


    @GetMapping
    public @ResponseBody Iterable<Basket> getAllBaskets() {
        return basketRepository.findAll();
    }

}
