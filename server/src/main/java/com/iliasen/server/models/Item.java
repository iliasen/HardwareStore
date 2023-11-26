package com.iliasen.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;
    @Column(nullable = false)
    private int price;
    @Column
    private int rating = 0;
    @Column
    private String about;
    @Column
    private String img;

    @JsonIgnore
    @ManyToMany(mappedBy = "items", cascade = CascadeType.ALL)
    private List<Basket> baskets;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemInfo> info;

    @JsonIgnore
    @ManyToMany(mappedBy = "items", cascade = CascadeType.ALL)
    private List<Order> orders;


    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Rating> ratings;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private Type type;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;
}