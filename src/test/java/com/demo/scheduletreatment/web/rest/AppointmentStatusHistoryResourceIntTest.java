package com.demo.scheduletreatment.web.rest;

import com.demo.scheduletreatment.TreatmentscheduleApp;

import com.demo.scheduletreatment.domain.AppointmentStatusHistory;
import com.demo.scheduletreatment.repository.AppointmentStatusHistoryRepository;
import com.demo.scheduletreatment.repository.search.AppointmentStatusHistorySearchRepository;
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
 * Test class for the AppointmentStatusHistoryResource REST controller.
 *
 * @see AppointmentStatusHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TreatmentscheduleApp.class)
public class AppointmentStatusHistoryResourceIntTest {

    private static final Instant DEFAULT_MODIFY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AppointmentStatusHistoryRepository appointmentStatusHistoryRepository;

    /**
     * This repository is mocked in the com.demo.scheduletreatment.repository.search test package.
     *
     * @see com.demo.scheduletreatment.repository.search.AppointmentStatusHistorySearchRepositoryMockConfiguration
     */
    @Autowired
    private AppointmentStatusHistorySearchRepository mockAppointmentStatusHistorySearchRepository;

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

    private MockMvc restAppointmentStatusHistoryMockMvc;

    private AppointmentStatusHistory appointmentStatusHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppointmentStatusHistoryResource appointmentStatusHistoryResource = new AppointmentStatusHistoryResource(appointmentStatusHistoryRepository, mockAppointmentStatusHistorySearchRepository);
        this.restAppointmentStatusHistoryMockMvc = MockMvcBuilders.standaloneSetup(appointmentStatusHistoryResource)
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
    public static AppointmentStatusHistory createEntity(EntityManager em) {
        AppointmentStatusHistory appointmentStatusHistory = new AppointmentStatusHistory()
            .modifyDate(DEFAULT_MODIFY_DATE);
        return appointmentStatusHistory;
    }

    @Before
    public void initTest() {
        appointmentStatusHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppointmentStatusHistory() throws Exception {
        int databaseSizeBeforeCreate = appointmentStatusHistoryRepository.findAll().size();

        // Create the AppointmentStatusHistory
        restAppointmentStatusHistoryMockMvc.perform(post("/api/appointment-status-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentStatusHistory)))
            .andExpect(status().isCreated());

        // Validate the AppointmentStatusHistory in the database
        List<AppointmentStatusHistory> appointmentStatusHistoryList = appointmentStatusHistoryRepository.findAll();
        assertThat(appointmentStatusHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        AppointmentStatusHistory testAppointmentStatusHistory = appointmentStatusHistoryList.get(appointmentStatusHistoryList.size() - 1);
        assertThat(testAppointmentStatusHistory.getModifyDate()).isEqualTo(DEFAULT_MODIFY_DATE);

        // Validate the AppointmentStatusHistory in Elasticsearch
        verify(mockAppointmentStatusHistorySearchRepository, times(1)).save(testAppointmentStatusHistory);
    }

    @Test
    @Transactional
    public void createAppointmentStatusHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appointmentStatusHistoryRepository.findAll().size();

        // Create the AppointmentStatusHistory with an existing ID
        appointmentStatusHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppointmentStatusHistoryMockMvc.perform(post("/api/appointment-status-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentStatusHistory)))
            .andExpect(status().isBadRequest());

        // Validate the AppointmentStatusHistory in the database
        List<AppointmentStatusHistory> appointmentStatusHistoryList = appointmentStatusHistoryRepository.findAll();
        assertThat(appointmentStatusHistoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the AppointmentStatusHistory in Elasticsearch
        verify(mockAppointmentStatusHistorySearchRepository, times(0)).save(appointmentStatusHistory);
    }

    @Test
    @Transactional
    public void getAllAppointmentStatusHistories() throws Exception {
        // Initialize the database
        appointmentStatusHistoryRepository.saveAndFlush(appointmentStatusHistory);

        // Get all the appointmentStatusHistoryList
        restAppointmentStatusHistoryMockMvc.perform(get("/api/appointment-status-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appointmentStatusHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].modifyDate").value(hasItem(DEFAULT_MODIFY_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getAppointmentStatusHistory() throws Exception {
        // Initialize the database
        appointmentStatusHistoryRepository.saveAndFlush(appointmentStatusHistory);

        // Get the appointmentStatusHistory
        restAppointmentStatusHistoryMockMvc.perform(get("/api/appointment-status-histories/{id}", appointmentStatusHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appointmentStatusHistory.getId().intValue()))
            .andExpect(jsonPath("$.modifyDate").value(DEFAULT_MODIFY_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppointmentStatusHistory() throws Exception {
        // Get the appointmentStatusHistory
        restAppointmentStatusHistoryMockMvc.perform(get("/api/appointment-status-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppointmentStatusHistory() throws Exception {
        // Initialize the database
        appointmentStatusHistoryRepository.saveAndFlush(appointmentStatusHistory);

        int databaseSizeBeforeUpdate = appointmentStatusHistoryRepository.findAll().size();

        // Update the appointmentStatusHistory
        AppointmentStatusHistory updatedAppointmentStatusHistory = appointmentStatusHistoryRepository.findById(appointmentStatusHistory.getId()).get();
        // Disconnect from session so that the updates on updatedAppointmentStatusHistory are not directly saved in db
        em.detach(updatedAppointmentStatusHistory);
        updatedAppointmentStatusHistory
            .modifyDate(UPDATED_MODIFY_DATE);

        restAppointmentStatusHistoryMockMvc.perform(put("/api/appointment-status-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppointmentStatusHistory)))
            .andExpect(status().isOk());

        // Validate the AppointmentStatusHistory in the database
        List<AppointmentStatusHistory> appointmentStatusHistoryList = appointmentStatusHistoryRepository.findAll();
        assertThat(appointmentStatusHistoryList).hasSize(databaseSizeBeforeUpdate);
        AppointmentStatusHistory testAppointmentStatusHistory = appointmentStatusHistoryList.get(appointmentStatusHistoryList.size() - 1);
        assertThat(testAppointmentStatusHistory.getModifyDate()).isEqualTo(UPDATED_MODIFY_DATE);

        // Validate the AppointmentStatusHistory in Elasticsearch
        verify(mockAppointmentStatusHistorySearchRepository, times(1)).save(testAppointmentStatusHistory);
    }

    @Test
    @Transactional
    public void updateNonExistingAppointmentStatusHistory() throws Exception {
        int databaseSizeBeforeUpdate = appointmentStatusHistoryRepository.findAll().size();

        // Create the AppointmentStatusHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppointmentStatusHistoryMockMvc.perform(put("/api/appointment-status-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentStatusHistory)))
            .andExpect(status().isBadRequest());

        // Validate the AppointmentStatusHistory in the database
        List<AppointmentStatusHistory> appointmentStatusHistoryList = appointmentStatusHistoryRepository.findAll();
        assertThat(appointmentStatusHistoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AppointmentStatusHistory in Elasticsearch
        verify(mockAppointmentStatusHistorySearchRepository, times(0)).save(appointmentStatusHistory);
    }

    @Test
    @Transactional
    public void deleteAppointmentStatusHistory() throws Exception {
        // Initialize the database
        appointmentStatusHistoryRepository.saveAndFlush(appointmentStatusHistory);

        int databaseSizeBeforeDelete = appointmentStatusHistoryRepository.findAll().size();

        // Get the appointmentStatusHistory
        restAppointmentStatusHistoryMockMvc.perform(delete("/api/appointment-status-histories/{id}", appointmentStatusHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AppointmentStatusHistory> appointmentStatusHistoryList = appointmentStatusHistoryRepository.findAll();
        assertThat(appointmentStatusHistoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AppointmentStatusHistory in Elasticsearch
        verify(mockAppointmentStatusHistorySearchRepository, times(1)).deleteById(appointmentStatusHistory.getId());
    }

    @Test
    @Transactional
    public void searchAppointmentStatusHistory() throws Exception {
        // Initialize the database
        appointmentStatusHistoryRepository.saveAndFlush(appointmentStatusHistory);
        when(mockAppointmentStatusHistorySearchRepository.search(queryStringQuery("id:" + appointmentStatusHistory.getId())))
            .thenReturn(Collections.singletonList(appointmentStatusHistory));
        // Search the appointmentStatusHistory
        restAppointmentStatusHistoryMockMvc.perform(get("/api/_search/appointment-status-histories?query=id:" + appointmentStatusHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appointmentStatusHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].modifyDate").value(hasItem(DEFAULT_MODIFY_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppointmentStatusHistory.class);
        AppointmentStatusHistory appointmentStatusHistory1 = new AppointmentStatusHistory();
        appointmentStatusHistory1.setId(1L);
        AppointmentStatusHistory appointmentStatusHistory2 = new AppointmentStatusHistory();
        appointmentStatusHistory2.setId(appointmentStatusHistory1.getId());
        assertThat(appointmentStatusHistory1).isEqualTo(appointmentStatusHistory2);
        appointmentStatusHistory2.setId(2L);
        assertThat(appointmentStatusHistory1).isNotEqualTo(appointmentStatusHistory2);
        appointmentStatusHistory1.setId(null);
        assertThat(appointmentStatusHistory1).isNotEqualTo(appointmentStatusHistory2);
    }
}
