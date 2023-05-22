package com.personal.kindreminder.controller;

import com.personal.kindreminder.exception.DuplicateActivityException;
import com.personal.kindreminder.model.PetActivity;
import com.personal.kindreminder.service.PetActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/pet-activity")
public class PetActivityController {

    @Autowired
    private PetActivityService petActivityService;

    @GetMapping("/{id}")
    public PetActivity getPetActivityById(@PathVariable("id") Long id) {
        return petActivityService.getPetActivityById(id);
    }

    @GetMapping
    public List<PetActivity> getAllPetActivities() {
        return petActivityService.getAllPetActivities();
    }

    @PostMapping
    public void addPetActivity(@RequestBody PetActivity petActivity) {
        try {
            petActivityService.addPetActivity(petActivity);
        } catch (DuplicateActivityException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage(), e);
        }
    }

    @PutMapping("/{id}")
    public String updatePetActivity(@PathVariable("id") Long id, @RequestBody PetActivity petActivity) {
        return petActivityService.updatePetActivity(petActivity);
    }

    @DeleteMapping("/{id}")
    public String deletePetActivity(@PathVariable("id") Long id) {
        return petActivityService.deletePetActivity(id);
    }

    @GetMapping("/petId/{petId}")
    public List<PetActivity> getPetActivityByPetId(@PathVariable("petId") Long petId) {
        return petActivityService.getPetActivityByPetId(petId);
    }

    @GetMapping("/deadline")
    public List<PetActivity> getPetActivityByDeadlineBefore() {
        return petActivityService.getPetActivityByDeadlineBefore();
    }
}