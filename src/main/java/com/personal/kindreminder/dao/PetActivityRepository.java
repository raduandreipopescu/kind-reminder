package com.personal.kindreminder.dao;

import com.personal.kindreminder.model.PetActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PetActivityRepository extends JpaRepository<PetActivity, Long> {
    List<PetActivity> getPetActivityByPetId(long petId);

    void deletePetActivityByPetId(long petId);

    List<PetActivity> getPetActivityByDeadlineBeforeOrderByDeadlineAsc(LocalDate dateLimit);
}
