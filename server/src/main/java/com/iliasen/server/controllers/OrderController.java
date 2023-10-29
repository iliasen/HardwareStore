package com.iliasen.server.controllers;

import com.iliasen.server.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="/order")
public class OrderController {
    private OrderRepository orderRepository;
}
