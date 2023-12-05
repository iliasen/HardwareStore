package com.iliasen.server.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iliasen.server.models.Brand;
import com.iliasen.server.models.Item;
import com.iliasen.server.models.ItemInfo;
import com.iliasen.server.models.Type;
import com.iliasen.server.repositories.BrandRepository;
import com.iliasen.server.repositories.ItemInfoRepository;
import com.iliasen.server.repositories.ItemRepository;
import com.iliasen.server.repositories.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/item")
public class ItemController {
    private final ItemRepository itemRepository;
    private final TypeRepository typeRepository;
    private final BrandRepository brandRepository;
    private final ItemInfoRepository itemInfoRepository;
    @PostMapping
    public ResponseEntity<Item> createItem(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam(value = "rating", required = false, defaultValue = "0") int rating,
            @RequestParam("about") String about,
            @RequestParam("img") MultipartFile image,
            @RequestParam("typeId") Integer typeId,
            @RequestParam("brandId") Integer brandId,
            @RequestParam(required = false) String infoJson) throws IOException {

        Item item = new Item();
        item.setName(name);
        item.setPrice(price);
        item.setRating(rating);
        item.setAbout(about);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + ".jpg";
            String uploadDir = "src/main/resources/static";

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            item.setImg(fileName);
        }

        Type type = typeRepository.findById(typeId)
                .orElseThrow(() -> new IllegalArgumentException("Неверный type_id: " + typeId));
        item.setType(type);

        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new IllegalArgumentException("Неверный brand_id: " + brandId));
        item.setBrand(brand);

        itemRepository.save(item);

        // Разбираем JSON строку в список объектов ItemInfo
        List<ItemInfo> info = new ArrayList<>();
        if (infoJson != null && !infoJson.isEmpty()) {
            info = new ObjectMapper().readValue(infoJson, new TypeReference<List<ItemInfo>>() {});
        }

        // Дальнейшая обработка массива info
        if (info != null) {
            for (ItemInfo infoItem : info) {
                ItemInfo itemInfo = new ItemInfo();
                itemInfo.setTitle(infoItem.getTitle());
                itemInfo.setDescription(infoItem.getDescription());
                itemInfo.setItem(item);
                itemInfoRepository.save(itemInfo);
            }
        }

        return ResponseEntity.ok(item);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getItems(
            @RequestParam(value = "typeId", required = false) Integer typeId,
            @RequestParam(value = "brandId", required = false) Integer brandId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "8") int limit) {

        Pageable pageable = PageRequest.of(page - 1, limit);

        List<Item> items;
        long totalCount;
        if (typeId != null && brandId != null) {
            Page<Item> pageResult = itemRepository.findAllByTypeIdAndBrandId(typeId, brandId, pageable);
            items = pageResult.getContent();
            totalCount = pageResult.getTotalElements();
        } else if (typeId != null) {
            Page<Item> pageResult = itemRepository.findAllByTypeId(typeId, pageable);
            items = pageResult.getContent();
            totalCount = pageResult.getTotalElements();
        } else if (brandId != null) {
            Page<Item> pageResult = itemRepository.findAllByBrandId(brandId, pageable);
            items = pageResult.getContent();
            totalCount = pageResult.getTotalElements();
        } else {
            Page<Item> pageResult = itemRepository.findAll(pageable);
            items = pageResult.getContent();
            totalCount = pageResult.getTotalElements();
        }

        String baseUrl = "http://localhost:5000/api/"; // Замените на базовый URL вашего сервера
        for (Item item : items) {
            String imageUrl = baseUrl + "/src/main/resources/static/" + item.getImg(); // Предполагая, что изображения находятся в папке "images"
            item.setImg(imageUrl);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("count", totalCount);
        response.put("rows", items);

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Item> getAll(){
        return itemRepository.findAll();
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Item>> getById(@PathVariable Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        Optional<Item> item = itemRepository.findById(id);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delItem(@PathVariable Integer id) {
        try {
            if (id == null) {
                return ResponseEntity.badRequest().body("Ошибка: Нет ID");
            }
            itemRepository.deleteById(id);
            return ResponseEntity.ok("Товар с ID: " + id + " удалён");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка: Товар с ID " + id + " не найден");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка: Внутренняя ошибка сервера");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Integer id,
                                           @RequestParam("name") String name,
                                           @RequestParam("price") int price,
                                           @RequestParam(value = "rating", required = false, defaultValue = "0") int rating,
                                           @RequestParam("about") String about,
                                           @RequestParam("img") MultipartFile image,
                                           @RequestParam("typeId") Integer typeId,
                                           @RequestParam("brandId") Integer brandId,
                                           @RequestParam(required = false) List<ItemInfo> info) throws IOException {

        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            item.setName(name);
            item.setPrice(price);
            item.setRating(rating);
            item.setAbout(about);

            if (image != null && !image.isEmpty()) {
                String fileName = UUID.randomUUID() + ".jpg";
                String uploadDir = "src/main/resources/static";

                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                item.setImg(fileName);
            }

            Type type = typeRepository.findById(typeId)
                    .orElseThrow(() -> new IllegalArgumentException("Неверный type_id: " + typeId));
            item.setType(type);

            Brand brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new IllegalArgumentException("Неверный brand_id: " + brandId));
            item.setBrand(brand);

            Item savedItem = itemRepository.save(item);

            
            if (info != null) {
                // Удаляем старые связанные записи ItemInfo
                itemInfoRepository.deleteByItem(savedItem);

                for (ItemInfo infoItem : info) {
                    ItemInfo itemInfo = new ItemInfo();
                    itemInfo.setTitle(infoItem.getTitle());
                    itemInfo.setDescription(infoItem.getDescription());
                    itemInfo.setItem(savedItem);
                    itemInfoRepository.save(itemInfo);
                }
            }

            return ResponseEntity.ok(savedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
