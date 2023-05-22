package com.personal.kindreminder.controller;

import com.personal.kindreminder.exception.DuplicateActivityException;
import com.personal.kindreminder.model.EstateActivity;
import com.personal.kindreminder.service.EstateActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/estate-activity")
public class EstateActivityController {

    @Autowired
    private EstateActivityService estateActivityService;

    @GetMapping("/{id}")
    public EstateActivity getEstateActivityById(@PathVariable("id") Long id) {
        return estateActivityService.getEstateActivityById(id);
    }

    @GetMapping
    public List<EstateActivity> getAllEstateActivities() {
        return estateActivityService.getAllEstateActivities();
    }

    @PostMapping
    public void addEstateActivity(@RequestBody EstateActivity estateActivity) {
        try {
            estateActivityService.addEstateActivity(estateActivity);
        } catch (DuplicateActivityException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage(), e);
        }
    }

    @PutMapping("/{id}")
    public String updateEstateActivity(@PathVariable("id") Long id, @RequestBody EstateActivity estateActivity) {
        return estateActivityService.updateEstateActivity(estateActivity);
    }

    @DeleteMapping("/{id}")
    public String deleteEstateActivity(@PathVariable("id") Long id) {
        return estateActivityService.deleteEstateActivity(id);
    }

    @GetMapping("/estateId/{estateId}")
    public List<EstateActivity> getEstateActivityByEstateId(@PathVariable("estateId") Long estateId) {
        return estateActivityService.getEstateActivityByEstateId(estateId);
    }

    @GetMapping("/deadline")
    public List<EstateActivity> getEstateActivityByDeadlineBefore() {
        return estateActivityService.getEstateActivityByDeadlineBefore();
    }
}