package com.iliasen.server.controllers;

import com.iliasen.server.repositories.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/brand")
public class BrandController {
    private BrandRepository brandRepository;


}
