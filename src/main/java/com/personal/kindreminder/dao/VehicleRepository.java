package com.personal.kindreminder.dao;

import com.personal.kindreminder.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsVehicleByPlateNumber(String plateNumber);
}
