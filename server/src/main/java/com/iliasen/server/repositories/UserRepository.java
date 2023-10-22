package com.iliasen.server.repositories;


import org.springframework.data.repository.CrudRepository;

import com.iliasen.server.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}