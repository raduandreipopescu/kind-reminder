package com.personal.kindreminder.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "estate")
@Data
public class Estate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String type;

    private String country;

    private String town;

    private String street;
}
