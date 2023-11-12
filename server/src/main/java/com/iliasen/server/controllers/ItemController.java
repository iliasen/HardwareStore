package com.iliasen.server.controllers;

import com.iliasen.server.models.Item;
import com.iliasen.server.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/item")
public class ItemController {
    private ItemRepository itemRepository;
/*
    @PostMapping
    public ResponseEntity<Item> create(@RequestBody Item item, @RequestParam("img") MultipartFile img) {

        try {
            String fileName = UUID.randomUUID().toString() + ".jpg";
            String uploadDir = "your-upload-directory"; // Укажите путь к каталогу для загрузки изображений

            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            File file = new File(uploadPath, fileName);
            img.transferTo(file);

            item.setImg(fileName);



            return ResponseEntity.ok(item);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }*/
}