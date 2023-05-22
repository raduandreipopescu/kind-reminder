package com.personal.kindreminder.controller;

import com.personal.kindreminder.dao.VehicleRepository;
import com.personal.kindreminder.exception.AddVehicleException;
import com.personal.kindreminder.model.Vehicle;
import com.personal.kindreminder.service.VehicleService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.mockito.Mockito.when;

@SpringBootTest
public class VehicleControllerTests {

    @Autowired
    private VehicleService vehicleService;

    @MockBean
    private VehicleRepository vehicleRepository;

    @Test
    public void getAllVehiclesTest() {

        Vehicle vehicleOne = Vehicle.builder()
                .id(1)
                .type("Car")
                .plateNumber("BV01AAA")
                .brand("Dacia")
                .model("Spring")
                .build();

        Vehicle vehicleTwo = Vehicle.builder()
                .id(2)
                .type("Car")
                .plateNumber("BV02BBB")
                .brand("Dacia")
                .model("Logan")
                .build();

        when(vehicleRepository.findAll()).thenReturn(Stream.of(
                vehicleOne, vehicleTwo).collect(Collectors.toList()));

        Assertions.assertThat(vehicleService.getAllVehicles().size()).isEqualTo(2);
    }

    @Test
    public void addVehicleTest() {

        Vehicle vehicleOne = Vehicle.builder()
                .id(1)
                .type("Car")
                .plateNumber("BV01AAA")
                .brand("Dacia")
                .model("Spring")
                .build();

        when(vehicleRepository.save(vehicleOne)).thenReturn(vehicleOne);

        Assertions.assertThat(vehicleService.addVehicle(vehicleOne)).isEqualTo(vehicleOne);
    }

    @Test
    @DisplayName("WHEN plate number already exists, THEN throw exception")
    public void addVehicleSamePlateNumberTest() {

        Vehicle vehicleOne = Vehicle.builder()
                .id(1)
                .type("Car")
                .plateNumber("BV01AAA")
                .brand("Dacia")
                .model("Spring")
                .build();

        when(vehicleRepository.existsVehicleByPlateNumber("BV01AAA")).thenReturn(true);

        org.junit.jupiter.api.Assertions.assertThrows(AddVehicleException.class, () -> vehicleService.addVehicle(vehicleOne));
    }
}
