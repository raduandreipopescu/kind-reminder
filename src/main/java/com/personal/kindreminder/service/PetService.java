package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.PetRepository;
import com.personal.kindreminder.model.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public Pet getPetById(long id) {
        return petRepository.findById(id).get();
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public String addPet(Pet pet) {
        petRepository.save(pet);
        return "Pet saved!";
    }

    public String updatePet(Pet pet) {
        Pet petFromDb = petRepository.getReferenceById(pet.getId());
        petFromDb.setType(pet.getType());
        petFromDb.setName(pet.getName());
        petRepository.save(petFromDb);
        return "Pet updated!";
    }

    public String deletePet(long id) {
        petRepository.deleteById(id);
        return "Pet was deleted!";
    }
}
