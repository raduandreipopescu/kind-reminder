package com.personal.kindreminder.dao;

import com.personal.kindreminder.model.VehicleActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VehicleActivityRepository extends JpaRepository<VehicleActivity, Long> {
    List<VehicleActivity> getVehicleActivityByVehicleId(long vehicleId);

    void deleteVehicleActivityByVehicleId(long vehicleId);

    List<VehicleActivity> getVehicleActivityByDeadlineBeforeOrderByDeadlineAsc(LocalDate dateLimit);
}
