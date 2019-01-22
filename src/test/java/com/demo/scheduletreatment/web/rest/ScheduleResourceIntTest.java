package com.demo.scheduletreatment.web.rest;

import com.demo.scheduletreatment.TreatmentscheduleApp;

import com.demo.scheduletreatment.domain.Schedule;
import com.demo.scheduletreatment.repository.ScheduleRepository;
import com.demo.scheduletreatment.repository.search.ScheduleSearchRepository;
import com.demo.scheduletreatment.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;


import static com.demo.scheduletreatment.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ScheduleResource REST controller.
 *
 * @see ScheduleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TreatmentscheduleApp.class)
public class ScheduleResourceIntTest {

    private static final Instant DEFAULT_INITIAL_APPOINTMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INITIAL_APPOINTMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FINAL_APPOINTMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FINAL_APPOINTMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DURATION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DURATION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ScheduleRepository scheduleRepository;

    /**
     * This repository is mocked in the com.demo.scheduletreatment.repository.search test package.
     *
     * @see com.demo.scheduletreatment.repository.search.ScheduleSearchRepositoryMockConfiguration
     */
    @Autowired
    private ScheduleSearchRepository mockScheduleSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restScheduleMockMvc;

    private Schedule schedule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScheduleResource scheduleResource = new ScheduleResource(scheduleRepository, mockScheduleSearchRepository);
        this.restScheduleMockMvc = MockMvcBuilders.standaloneSetup(scheduleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Schedule createEntity(EntityManager em) {
        Schedule schedule = new Schedule()
            .initialAppointmentDate(DEFAULT_INITIAL_APPOINTMENT_DATE)
            .finalAppointmentDate(DEFAULT_FINAL_APPOINTMENT_DATE)
            .duration(DEFAULT_DURATION);
        return schedule;
    }

    @Before
    public void initTest() {
        schedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchedule() throws Exception {
        int databaseSizeBeforeCreate = scheduleRepository.findAll().size();

        // Create the Schedule
        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isCreated());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeCreate + 1);
        Schedule testSchedule = scheduleList.get(scheduleList.size() - 1);
        assertThat(testSchedule.getInitialAppointmentDate()).isEqualTo(DEFAULT_INITIAL_APPOINTMENT_DATE);
        assertThat(testSchedule.getFinalAppointmentDate()).isEqualTo(DEFAULT_FINAL_APPOINTMENT_DATE);
        assertThat(testSchedule.getDuration()).isEqualTo(DEFAULT_DURATION);

        // Validate the Schedule in Elasticsearch
        verify(mockScheduleSearchRepository, times(1)).save(testSchedule);
    }

    @Test
    @Transactional
    public void createScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scheduleRepository.findAll().size();

        // Create the Schedule with an existing ID
        schedule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeCreate);

        // Validate the Schedule in Elasticsearch
        verify(mockScheduleSearchRepository, times(0)).save(schedule);
    }

    @Test
    @Transactional
    public void checkInitialAppointmentDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = scheduleRepository.findAll().size();
        // set the field null
        schedule.setInitialAppointmentDate(null);

        // Create the Schedule, which fails.

        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFinalAppointmentDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = scheduleRepository.findAll().size();
        // set the field null
        schedule.setFinalAppointmentDate(null);

        // Create the Schedule, which fails.

        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSchedules() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        // Get all the scheduleList
        restScheduleMockMvc.perform(get("/api/schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].initialAppointmentDate").value(hasItem(DEFAULT_INITIAL_APPOINTMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].finalAppointmentDate").value(hasItem(DEFAULT_FINAL_APPOINTMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())));
    }
    
    @Test
    @Transactional
    public void getSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        // Get the schedule
        restScheduleMockMvc.perform(get("/api/schedules/{id}", schedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schedule.getId().intValue()))
            .andExpect(jsonPath("$.initialAppointmentDate").value(DEFAULT_INITIAL_APPOINTMENT_DATE.toString()))
            .andExpect(jsonPath("$.finalAppointmentDate").value(DEFAULT_FINAL_APPOINTMENT_DATE.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchedule() throws Exception {
        // Get the schedule
        restScheduleMockMvc.perform(get("/api/schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        int databaseSizeBeforeUpdate = scheduleRepository.findAll().size();

        // Update the schedule
        Schedule updatedSchedule = scheduleRepository.findById(schedule.getId()).get();
        // Disconnect from session so that the updates on updatedSchedule are not directly saved in db
        em.detach(updatedSchedule);
        updatedSchedule
            .initialAppointmentDate(UPDATED_INITIAL_APPOINTMENT_DATE)
            .finalAppointmentDate(UPDATED_FINAL_APPOINTMENT_DATE)
            .duration(UPDATED_DURATION);

        restScheduleMockMvc.perform(put("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchedule)))
            .andExpect(status().isOk());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeUpdate);
        Schedule testSchedule = scheduleList.get(scheduleList.size() - 1);
        assertThat(testSchedule.getInitialAppointmentDate()).isEqualTo(UPDATED_INITIAL_APPOINTMENT_DATE);
        assertThat(testSchedule.getFinalAppointmentDate()).isEqualTo(UPDATED_FINAL_APPOINTMENT_DATE);
        assertThat(testSchedule.getDuration()).isEqualTo(UPDATED_DURATION);

        // Validate the Schedule in Elasticsearch
        verify(mockScheduleSearchRepository, times(1)).save(testSchedule);
    }

    @Test
    @Transactional
    public void updateNonExistingSchedule() throws Exception {
        int databaseSizeBeforeUpdate = scheduleRepository.findAll().size();

        // Create the Schedule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScheduleMockMvc.perform(put("/api/schedules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Schedule in Elasticsearch
        verify(mockScheduleSearchRepository, times(0)).save(schedule);
    }

    @Test
    @Transactional
    public void deleteSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        int databaseSizeBeforeDelete = scheduleRepository.findAll().size();

        // Get the schedule
        restScheduleMockMvc.perform(delete("/api/schedules/{id}", schedule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Schedule in Elasticsearch
        verify(mockScheduleSearchRepository, times(1)).deleteById(schedule.getId());
    }

    @Test
    @Transactional
    public void searchSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);
        when(mockScheduleSearchRepository.search(queryStringQuery("id:" + schedule.getId())))
            .thenReturn(Collections.singletonList(schedule));
        // Search the schedule
        restScheduleMockMvc.perform(get("/api/_search/schedules?query=id:" + schedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].initialAppointmentDate").value(hasItem(DEFAULT_INITIAL_APPOINTMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].finalAppointmentDate").value(hasItem(DEFAULT_FINAL_APPOINTMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Schedule.class);
        Schedule schedule1 = new Schedule();
        schedule1.setId(1L);
        Schedule schedule2 = new Schedule();
        schedule2.setId(schedule1.getId());
        assertThat(schedule1).isEqualTo(schedule2);
        schedule2.setId(2L);
        assertThat(schedule1).isNotEqualTo(schedule2);
        schedule1.setId(null);
        assertThat(schedule1).isNotEqualTo(schedule2);
    }
}
