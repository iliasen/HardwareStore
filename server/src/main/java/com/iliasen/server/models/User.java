    package com.iliasen.server.models;


    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.CascadeType;
    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.JoinColumn;
    import jakarta.persistence.OneToMany;
    import jakarta.persistence.OneToOne;
    import jakarta.persistence.Table;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.util.List;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    @Table(name = "users")
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        @Column
        private String name;
        @Column
        private String lastName;
        @Column(unique = true)
        private String email;
        @Column
        private String password;
        @Column
        private String role = "USER";

        @OneToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "basket_id")
        private Basket basket;


        @JsonIgnore
        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Rating> ratings;

        @JsonIgnore
        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Order> orders;
    }
