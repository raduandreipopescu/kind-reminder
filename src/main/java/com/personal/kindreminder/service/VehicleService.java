package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.VehicleRepository;
import com.personal.kindreminder.exception.AddVehicleException;
import com.personal.kindreminder.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleActivityService vehicleActivityService;

    public Vehicle getVehicleById(long id) {
        return vehicleRepository.findById(id).get();
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle addVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsVehicleByPlateNumber(vehicle.getPlateNumber())) {
            throw new AddVehicleException("Wrong plate number. Vehicle already exists.");
        }
        return vehicleRepository.save(vehicle);
    }

    public String updateVehicle(Vehicle vehicle) {
        if (!vehicleRepository.existsVehicleByPlateNumber(vehicle.getPlateNumber())) {
            return "Wrong plate number. Vehicle does not exist!";
        } else {
            Vehicle vehicleFromDb = vehicleRepository.getReferenceById(vehicle.getId());
            vehicleFromDb.setType(vehicle.getType());
            vehicleFromDb.setBrand(vehicle.getBrand());
            vehicleFromDb.setModel(vehicle.getModel());
            vehicleRepository.save(vehicleFromDb);
        }
        return "Vehicle updated!";
    }

    public String deleteVehicle(long id) {
        vehicleActivityService.deleteVehicleActivityByVehicleId(id);
        vehicleRepository.deleteById(id);
        return "Vehicle was deleted!";
    }
}
