package com.iliasen.server.repositories;

import com.iliasen.server.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Page<Item> findAllByTypeIdAndBrandId(Integer typeId, Integer brandId, Pageable pageable);

    Page<Item> findAllByTypeId(Integer typeId, Pageable pageable);

    Page<Item> findAllByBrandId(Integer brandId, Pageable pageable);

    List<Item> findByNameContaining(String query);
}