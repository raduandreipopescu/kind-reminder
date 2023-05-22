package com.personal.kindreminder.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pet_activity")
@Data
public class PetActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    private LocalDate deadline;

    private String description;
}
