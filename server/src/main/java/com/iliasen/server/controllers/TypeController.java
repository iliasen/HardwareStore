package com.iliasen.server.controllers;

import com.iliasen.server.models.Type;
import com.iliasen.server.repositories.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/type")
public class TypeController {
    private final TypeRepository typeRepository;

    @PostMapping
    public ResponseEntity<Type> add(@RequestBody Type type){
        if(type == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        typeRepository.save(type);
        return ResponseEntity.ok(type);
    }

    @GetMapping
    public @ResponseBody Iterable<Type> getAll(){
        return typeRepository.findAll();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delType(@PathVariable Integer id) {
        try {
            if (id == null) {
                return ResponseEntity.badRequest().body("Ошибка. Нет ID");
            }

            typeRepository.deleteById(id);
            return ResponseEntity.ok("Тип с ID " + id + " удалён");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка: тип с ID " + id + " не найден");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка: Внутренняя ошибка сервера");
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<String> updateBrand(@PathVariable Integer id, @RequestBody Type updatedType) {
        try {
            Optional<Type> optionalBrand = typeRepository.findById(id);
            if (optionalBrand.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка: тип с ID " + id + " не найден");
            }

            Type type = optionalBrand.get();

            type.setName(updatedType.getName());

            typeRepository.save(type);
            return ResponseEntity.ok("Тип с ID " + id + " обновлен");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка: Внутренняя ошибка сервера");
        }
    }
}