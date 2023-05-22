package com.personal.kindreminder.controller;

import com.personal.kindreminder.model.Estate;
import com.personal.kindreminder.service.EstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estate")
public class EstateController {

    @Autowired
    private EstateService estateService;

    @GetMapping("/{id}")
    public Estate getEstateById(@PathVariable("id") Long id) {
        return estateService.getEstateById(id);
    }

    @GetMapping
    public List<Estate> getAllEstates() {
        return estateService.getAllEstates();
    }

    @PostMapping
    public String addEstate(@RequestBody Estate estate) {
        return estateService.addEstate(estate);
    }

    @PutMapping("/{id}")
    public String updateEstate(@PathVariable("id") Long id, @RequestBody Estate estate) {
        return estateService.updateEstate(estate);
    }

    @DeleteMapping("/{id}")
    public String deleteEstate(@PathVariable("id") Long id) {
        return estateService.deleteEstate(id);
    }
}
