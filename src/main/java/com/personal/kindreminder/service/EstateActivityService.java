package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.EstateActivityRepository;
import com.personal.kindreminder.exception.DuplicateActivityException;
import com.personal.kindreminder.model.EstateActivity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.exact;

@Service
public class EstateActivityService {

    @Autowired
    private EstateActivityRepository estateActivityRepository;

    public EstateActivity getEstateActivityById(long id) {
        return estateActivityRepository.findById(id).get();
    }

    public List<EstateActivity> getAllEstateActivities() {
        return estateActivityRepository.findAll();
    }

    public EstateActivity addEstateActivity(EstateActivity estateActivity) {
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id", "deadline", "description")
                .withMatcher("estate", exact())
                .withMatcher("activity", exact())
                .withMatcher("user", exact());
        Example<EstateActivity> example = Example.of(estateActivity, modelMatcher);

        if (estateActivityRepository.exists(example)) {
            throw new DuplicateActivityException("Estate already has this schedule!");
        }
        return estateActivityRepository.save(estateActivity);
    }

    public String updateEstateActivity(EstateActivity estateActivity) {
        EstateActivity estateActivityFromDb = estateActivityRepository.getReferenceById(estateActivity.getId());
        estateActivityFromDb.setDeadline(estateActivity.getDeadline());
        estateActivityFromDb.setDescription(estateActivity.getDescription());
        estateActivityRepository.save(estateActivityFromDb);
        return "Schedule updated!";
    }

    public String deleteEstateActivity(long id) {
        estateActivityRepository.deleteById(id);
        return "Schedule was deleted!";
    }

    public List<EstateActivity> getEstateActivityByEstateId(long estateId) {
        return estateActivityRepository.getEstateActivityByEstateId(estateId);
    }

    @Transactional
    public void deleteEstateActivityByEstateId(long estateId) {
        estateActivityRepository.deleteEstateActivityByEstateId(estateId);
    }

    public List<EstateActivity> getEstateActivityByDeadlineBefore() {
        LocalDate localDate = LocalDate.now().plusDays(30);
        return estateActivityRepository.getEstateActivityByDeadlineBeforeOrderByDeadlineAsc(localDate);
    }
}
