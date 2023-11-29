package com.iliasen.server.controllers;

import com.iliasen.server.models.Brand;
import com.iliasen.server.repositories.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/brand")
public class BrandController {
    private final BrandRepository brandRepository;

    @PostMapping
    public ResponseEntity<Brand> add(@RequestBody Brand brand){
        if(brand == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        brandRepository.save(brand);
        return ResponseEntity.ok(brand);
    }

    @GetMapping
    public @ResponseBody Iterable<Brand> getAll(){
        return brandRepository.findAll();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delBrand(@PathVariable Integer id) {
        try {
            if (id == null) {
                return ResponseEntity.badRequest().body("Ошибка: Нет ID");
            }

            brandRepository.deleteById(id);
            return ResponseEntity.ok("Брэнд с ID: " + id + " удалён");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка: Брэнд с ID " + id + " не найден");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка: Внутренняя ошибка сервера");
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<String> updateBrand(@PathVariable Integer id, @RequestBody Brand updatedBrand) {
        try {
            Optional<Brand> optionalBrand = brandRepository.findById(id);
            if (optionalBrand.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка: Бренд с ID " + id + " не найден");
            }

            Brand brand = optionalBrand.get();

            brand.setName(updatedBrand.getName());
            brand.setCountry(updatedBrand.getCountry());

            brandRepository.save(brand);
            return ResponseEntity.ok("Бренд с ID " + id + " обновлен");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка: Внутренняя ошибка сервера");
        }
    }
}
