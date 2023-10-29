package com.iliasen.server.controllers;

import com.iliasen.server.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/item")
public class ItemController {
    private ItemRepository itemRepository;
}
