package com.iliasen.server.repositories;

import com.iliasen.server.models.Rating;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends CrudRepository<Rating, Integer> {
}
