package com.personal.kindreminder.service;

import com.personal.kindreminder.dao.ActivityRepository;
import com.personal.kindreminder.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public Activity getActivityById(long id) {
        return activityRepository.findById(id).get();
    }

    public List<Activity> getActivityByCategory(String category) {
        return activityRepository.getActivityByCategory(category);
    }
}
