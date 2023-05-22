package com.personal.kindreminder.controller;

import com.personal.kindreminder.exception.DuplicateActivityException;
import com.personal.kindreminder.model.VehicleActivity;
import com.personal.kindreminder.service.VehicleActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/vehicle-activity")
public class VehicleActivityController {

    @Autowired
    private VehicleActivityService vehicleActivityService;

    @GetMapping("/{id}")
    public VehicleActivity getVehicleActivityById(@PathVariable("id") Long id) {
        return vehicleActivityService.getVehicleActivityById(id);
    }

    @GetMapping
    public List<VehicleActivity> getAllVehicleActivities() {
        return vehicleActivityService.getAllVehicleActivities();
    }

    @PostMapping
    public void addVehicleActivity(@RequestBody VehicleActivity vehicleActivity) {
        try {
            vehicleActivityService.addVehicleActivity(vehicleActivity);
        } catch (DuplicateActivityException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage(), e);
        }
    }

    @PutMapping("/{id}")
    public String updateVehicleActivity(@PathVariable("id") Long id, @RequestBody VehicleActivity vehicleActivity) {
        return vehicleActivityService.updateVehicleActivity(vehicleActivity);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicleActivity(@PathVariable("id") Long id) {
        return vehicleActivityService.deleteVehicleActivity(id);
    }

    @GetMapping("/vehicleId/{vehicleId}")
    public List<VehicleActivity> getVehicleActivityByVehicleId(@PathVariable("vehicleId") Long vehicleId) {
        return vehicleActivityService.getVehicleActivityByVehicleId(vehicleId);
    }

    @GetMapping("/deadline")
    public List<VehicleActivity> getVehicleActivityByDeadlineBefore() {
        return vehicleActivityService.getVehicleActivityByDeadlineBefore();
    }
}