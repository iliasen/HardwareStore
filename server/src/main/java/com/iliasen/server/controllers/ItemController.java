package com.iliasen.server.controllers;

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
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/items")
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
            @RequestParam("type_id") Integer typeId,
            @RequestParam("brand_id") Integer brandId,
            @RequestParam(required = false) List<ItemInfo> info) throws IOException {

        Item item = new Item();
        item.setName(name);
        item.setPrice(price);
        item.setRating(rating);
        item.setAbout(about);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + ".jpg";
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

        // Дальнейшая обработка массива info
        if(info != null){
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
    public ResponseEntity<List<Item>> getAllItems(
            @RequestParam(value = "type_id", required = false) Integer typeId,
            @RequestParam(value = "brand_id", required = false) Integer brandId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "8") int limit) {

        Pageable pageable = PageRequest.of(page - 1, limit);

        List<Item> items;
        if (typeId != null && brandId != null) {
            items = itemRepository.findAllByTypeIdAndBrandId(typeId, brandId, pageable).getContent();
        } else if (typeId != null) {
            items = itemRepository.findAllByTypeId(typeId, pageable).toList();
        } else if (brandId != null) {
            items = itemRepository.findAllByBrandId(brandId, pageable).toList();
        } else {
            items = itemRepository.findAll(pageable).toList();
        }

        return ResponseEntity.ok(items);
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
                                           @RequestParam("type_id") Integer typeId,
                                           @RequestParam("brand_id") Integer brandId,
                                           @RequestParam(required = false) List<ItemInfo> info) throws IOException {

        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            item.setName(name);
            item.setPrice(price);
            item.setRating(rating);
            item.setAbout(about);

            if (image != null && !image.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + ".jpg";
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
