package com.personal.kindreminder.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "pet")
@Data
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String type;

    private String name;
}
