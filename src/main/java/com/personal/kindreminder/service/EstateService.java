package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.EstateRepository;
import com.personal.kindreminder.model.Estate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstateService {

    @Autowired
    private EstateRepository estateRepository;

    @Autowired
    private EstateActivityService estateActivityService;

    public Estate getEstateById(long id) {
        return estateRepository.findById(id).get();
    }

    public List<Estate> getAllEstates() {
        return estateRepository.findAll();
    }

    public String addEstate(Estate estate) {
        estateRepository.save(estate);
        return "Estate saved!";
    }

    public String updateEstate(Estate estate) {
        Estate estateFromDb = estateRepository.getReferenceById(estate.getId());
        estateFromDb.setType(estate.getType());
        estateFromDb.setCountry(estate.getCountry());
        estateFromDb.setTown(estate.getTown());
        estateFromDb.setStreet(estate.getStreet());
        estateRepository.save(estateFromDb);
        return "Estate updated!";
    }

    public String deleteEstate(long id) {
        estateActivityService.deleteEstateActivityByEstateId(id);
        estateRepository.deleteById(id);
        return "Estate was deleted!";
    }
}
