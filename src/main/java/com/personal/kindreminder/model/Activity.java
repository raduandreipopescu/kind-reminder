package com.personal.kindreminder.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "activity")
@Data
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String category;
}
