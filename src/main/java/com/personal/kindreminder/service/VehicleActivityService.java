package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.VehicleActivityRepository;
import com.personal.kindreminder.exception.DuplicateActivityException;
import com.personal.kindreminder.model.VehicleActivity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.exact;

@Service
public class VehicleActivityService {

    @Autowired
    private VehicleActivityRepository vehicleActivityRepository;

    public VehicleActivity getVehicleActivityById(long id) {
        return vehicleActivityRepository.findById(id).get();
    }

    public List<VehicleActivity> getAllVehicleActivities() {
        return vehicleActivityRepository.findAll();
    }

    public VehicleActivity addVehicleActivity(VehicleActivity vehicleActivity) {
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id", "deadline", "description")
                .withMatcher("vehicle", exact())
                .withMatcher("activity", exact())
                .withMatcher("user", exact());
        Example<VehicleActivity> example = Example.of(vehicleActivity, modelMatcher);

        if (vehicleActivityRepository.exists(example)) {
            throw new DuplicateActivityException("Vehicle already has this schedule!");
        }
        return vehicleActivityRepository.save(vehicleActivity);
    }

    public String updateVehicleActivity(VehicleActivity vehicleActivity) {
        VehicleActivity vehicleActivityFromDb = vehicleActivityRepository.getReferenceById(vehicleActivity.getId());
        vehicleActivityFromDb.setDeadline(vehicleActivity.getDeadline());
        vehicleActivityFromDb.setDescription(vehicleActivity.getDescription());
        vehicleActivityRepository.save(vehicleActivityFromDb);
        return "Schedule updated!";
    }

    public String deleteVehicleActivity(long id) {
        vehicleActivityRepository.deleteById(id);
        return "Schedule was deleted!";
    }

    public List<VehicleActivity> getVehicleActivityByVehicleId(long vehicleId) {
        return vehicleActivityRepository.getVehicleActivityByVehicleId(vehicleId);
    }

    @Transactional
    public void deleteVehicleActivityByVehicleId(long vehicleId) {
        vehicleActivityRepository.deleteVehicleActivityByVehicleId(vehicleId);
    }

    public List<VehicleActivity> getVehicleActivityByDeadlineBefore() {
        LocalDate localDate = LocalDate.now().plusDays(30);
        return vehicleActivityRepository.getVehicleActivityByDeadlineBeforeOrderByDeadlineAsc(localDate);
    }
}
