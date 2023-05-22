package com.personal.kindreminder.controller;

import com.personal.kindreminder.model.Pet;
import com.personal.kindreminder.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable("id") Long id) {
        return petService.getPetById(id);
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @PostMapping
    public String addPet(@RequestBody Pet pet) {
        return petService.addPet(pet);
    }

    @PutMapping("/{id}")
    public String updatePet(@PathVariable("id") Long id, @RequestBody Pet pet) {
        return petService.updatePet(pet);
    }

    @DeleteMapping("/{id}")
    public String deletePet(@PathVariable("id") Long id) {
        return petService.deletePet(id);
    }
}
