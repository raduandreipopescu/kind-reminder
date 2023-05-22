package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.PetActivityRepository;
import com.personal.kindreminder.exception.DuplicateActivityException;
import com.personal.kindreminder.model.PetActivity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.exact;

@Service
public class PetActivityService {

    @Autowired
    private PetActivityRepository petActivityRepository;

    public PetActivity getPetActivityById(long id) {
        return petActivityRepository.findById(id).get();
    }

    public List<PetActivity> getAllPetActivities() {
        return petActivityRepository.findAll();
    }

    public PetActivity addPetActivity(PetActivity petActivity) {
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id", "deadline", "description")
                .withMatcher("pet", exact())
                .withMatcher("activity", exact())
                .withMatcher("user", exact());
        Example<PetActivity> example = Example.of(petActivity, modelMatcher);

        if (petActivityRepository.exists(example)) {
            throw new DuplicateActivityException("Pet already has this schedule!");
        }
        return petActivityRepository.save(petActivity);
    }

    public String updatePetActivity(PetActivity petActivity) {
        PetActivity petActivityFromDb = petActivityRepository.getReferenceById(petActivity.getId());
        petActivityFromDb.setDeadline(petActivity.getDeadline());
        petActivityFromDb.setDescription(petActivity.getDescription());
        petActivityRepository.save(petActivityFromDb);
        return "Schedule updated!";
    }

    public String deletePetActivity(long id) {
        petActivityRepository.deleteById(id);
        return "Schedule was deleted!";
    }

    public List<PetActivity> getPetActivityByPetId(long petId) {
        return petActivityRepository.getPetActivityByPetId(petId);
    }

    @Transactional
    public void deletePetActivityByPetId(long petId) {
        petActivityRepository.deletePetActivityByPetId(petId);
    }

    public List<PetActivity> getPetActivityByDeadlineBefore() {
        LocalDate localDate = LocalDate.now().plusDays(30);
        return petActivityRepository.getPetActivityByDeadlineBeforeOrderByDeadlineAsc(localDate);
    }
}
