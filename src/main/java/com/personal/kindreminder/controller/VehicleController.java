package com.personal.kindreminder.controller;

import com.personal.kindreminder.exception.AddVehicleException;
import com.personal.kindreminder.model.Vehicle;
import com.personal.kindreminder.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable("id") Long id) {
        return vehicleService.getVehicleById(id);
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @PostMapping
    public void addVehicle(@RequestBody Vehicle vehicle) {
        try {
            vehicleService.addVehicle(vehicle);
        } catch (AddVehicleException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage(), e);
        }
    }

    @PutMapping("/{id}")
    public String updateVehicle(@PathVariable("id") Long id, @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(vehicle);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable("id") Long id) {
        return vehicleService.deleteVehicle(id);
    }
}