package com.iliasen.server.controllers;

import com.iliasen.server.repositories.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/basket")
public class TypeController {
    private TypeRepository typeRepository;
}