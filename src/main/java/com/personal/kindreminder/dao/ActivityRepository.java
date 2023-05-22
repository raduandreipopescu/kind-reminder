package com.personal.kindreminder.dao;

import com.personal.kindreminder.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> getActivityByCategory(String category);
}
