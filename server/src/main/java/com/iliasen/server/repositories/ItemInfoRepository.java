package com.iliasen.server.repositories;

import com.iliasen.server.models.ItemInfo;
import org.springframework.data.repository.CrudRepository;

public interface ItemInfoRepository extends CrudRepository<ItemInfo, Integer> {
}