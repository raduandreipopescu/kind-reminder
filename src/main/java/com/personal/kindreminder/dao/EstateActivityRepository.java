package com.personal.kindreminder.dao;

import com.personal.kindreminder.model.EstateActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EstateActivityRepository extends JpaRepository<EstateActivity, Long> {
    List<EstateActivity> getEstateActivityByEstateId(long estateId);

    void deleteEstateActivityByEstateId(long estateId);

    List<EstateActivity> getEstateActivityByDeadlineBeforeOrderByDeadlineAsc(LocalDate dateLimit);
}
