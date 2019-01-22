package com.demo.scheduletreatment.cucumber.stepdefs;

import com.demo.scheduletreatment.TreatmentscheduleApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TreatmentscheduleApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
