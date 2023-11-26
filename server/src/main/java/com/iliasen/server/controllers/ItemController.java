package com.iliasen.server.controllers;

import com.iliasen.server.models.Brand;
import com.iliasen.server.models.Item;
import com.iliasen.server.models.Type;
import com.iliasen.server.repositories.BrandRepository;
import com.iliasen.server.repositories.ItemRepository;
import com.iliasen.server.repositories.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/item")
public class ItemController {
    private final ItemRepository itemRepository;
    private final TypeRepository typeRepository;
    private final BrandRepository brandRepository;

    @PostMapping
    public ResponseEntity<Item> createItem(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam(value = "rating", required = false, defaultValue = "0") int rating,
            @RequestParam("about") String about,
            @RequestParam("img") MultipartFile image,
            @RequestParam("type_id") Integer typeId,
            @RequestParam("brand_id") Integer brandId) throws IOException {

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
        return ResponseEntity.ok(item);
    }
}
