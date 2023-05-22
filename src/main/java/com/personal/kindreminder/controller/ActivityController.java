package com.personal.kindreminder.controller;

import com.personal.kindreminder.model.Activity;
import com.personal.kindreminder.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable("id") Long id) {
        return activityService.getActivityById(id);
    }

    @GetMapping("/category/{category}")
    public List<Activity> getActivityByCategory(@PathVariable("category") String category) {
        return activityService.getActivityByCategory(category);
    }
}
