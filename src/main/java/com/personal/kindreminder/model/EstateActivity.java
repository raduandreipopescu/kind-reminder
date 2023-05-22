package com.personal.kindreminder.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "estate_activity")
@Data
public class EstateActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "estate_id")
    private Estate estate;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    private LocalDate deadline;

    private String description;
}
