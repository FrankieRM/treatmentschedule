package com.demo.scheduletreatment.web.rest;

import com.demo.scheduletreatment.TreatmentscheduleApp;

import com.demo.scheduletreatment.domain.TreatmentItem;
import com.demo.scheduletreatment.repository.TreatmentItemRepository;
import com.demo.scheduletreatment.repository.search.TreatmentItemSearchRepository;
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
 * Test class for the TreatmentItemResource REST controller.
 *
 * @see TreatmentItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TreatmentscheduleApp.class)
public class TreatmentItemResourceIntTest {

    private static final Instant DEFAULT_INITIAL_SERVICE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INITIAL_SERVICE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_DISCOUNT = 1D;
    private static final Double UPDATED_DISCOUNT = 2D;

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;

    @Autowired
    private TreatmentItemRepository treatmentItemRepository;

    /**
     * This repository is mocked in the com.demo.scheduletreatment.repository.search test package.
     *
     * @see com.demo.scheduletreatment.repository.search.TreatmentItemSearchRepositoryMockConfiguration
     */
    @Autowired
    private TreatmentItemSearchRepository mockTreatmentItemSearchRepository;

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

    private MockMvc restTreatmentItemMockMvc;

    private TreatmentItem treatmentItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TreatmentItemResource treatmentItemResource = new TreatmentItemResource(treatmentItemRepository, mockTreatmentItemSearchRepository);
        this.restTreatmentItemMockMvc = MockMvcBuilders.standaloneSetup(treatmentItemResource)
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
    public static TreatmentItem createEntity(EntityManager em) {
        TreatmentItem treatmentItem = new TreatmentItem()
            .initialServiceDate(DEFAULT_INITIAL_SERVICE_DATE)
            .discount(DEFAULT_DISCOUNT)
            .total(DEFAULT_TOTAL);
        return treatmentItem;
    }

    @Before
    public void initTest() {
        treatmentItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createTreatmentItem() throws Exception {
        int databaseSizeBeforeCreate = treatmentItemRepository.findAll().size();

        // Create the TreatmentItem
        restTreatmentItemMockMvc.perform(post("/api/treatment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(treatmentItem)))
            .andExpect(status().isCreated());

        // Validate the TreatmentItem in the database
        List<TreatmentItem> treatmentItemList = treatmentItemRepository.findAll();
        assertThat(treatmentItemList).hasSize(databaseSizeBeforeCreate + 1);
        TreatmentItem testTreatmentItem = treatmentItemList.get(treatmentItemList.size() - 1);
        assertThat(testTreatmentItem.getInitialServiceDate()).isEqualTo(DEFAULT_INITIAL_SERVICE_DATE);
        assertThat(testTreatmentItem.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testTreatmentItem.getTotal()).isEqualTo(DEFAULT_TOTAL);

        // Validate the TreatmentItem in Elasticsearch
        verify(mockTreatmentItemSearchRepository, times(1)).save(testTreatmentItem);
    }

    @Test
    @Transactional
    public void createTreatmentItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = treatmentItemRepository.findAll().size();

        // Create the TreatmentItem with an existing ID
        treatmentItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTreatmentItemMockMvc.perform(post("/api/treatment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(treatmentItem)))
            .andExpect(status().isBadRequest());

        // Validate the TreatmentItem in the database
        List<TreatmentItem> treatmentItemList = treatmentItemRepository.findAll();
        assertThat(treatmentItemList).hasSize(databaseSizeBeforeCreate);

        // Validate the TreatmentItem in Elasticsearch
        verify(mockTreatmentItemSearchRepository, times(0)).save(treatmentItem);
    }

    @Test
    @Transactional
    public void getAllTreatmentItems() throws Exception {
        // Initialize the database
        treatmentItemRepository.saveAndFlush(treatmentItem);

        // Get all the treatmentItemList
        restTreatmentItemMockMvc.perform(get("/api/treatment-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(treatmentItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].initialServiceDate").value(hasItem(DEFAULT_INITIAL_SERVICE_DATE.toString())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTreatmentItem() throws Exception {
        // Initialize the database
        treatmentItemRepository.saveAndFlush(treatmentItem);

        // Get the treatmentItem
        restTreatmentItemMockMvc.perform(get("/api/treatment-items/{id}", treatmentItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(treatmentItem.getId().intValue()))
            .andExpect(jsonPath("$.initialServiceDate").value(DEFAULT_INITIAL_SERVICE_DATE.toString()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.doubleValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTreatmentItem() throws Exception {
        // Get the treatmentItem
        restTreatmentItemMockMvc.perform(get("/api/treatment-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTreatmentItem() throws Exception {
        // Initialize the database
        treatmentItemRepository.saveAndFlush(treatmentItem);

        int databaseSizeBeforeUpdate = treatmentItemRepository.findAll().size();

        // Update the treatmentItem
        TreatmentItem updatedTreatmentItem = treatmentItemRepository.findById(treatmentItem.getId()).get();
        // Disconnect from session so that the updates on updatedTreatmentItem are not directly saved in db
        em.detach(updatedTreatmentItem);
        updatedTreatmentItem
            .initialServiceDate(UPDATED_INITIAL_SERVICE_DATE)
            .discount(UPDATED_DISCOUNT)
            .total(UPDATED_TOTAL);

        restTreatmentItemMockMvc.perform(put("/api/treatment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTreatmentItem)))
            .andExpect(status().isOk());

        // Validate the TreatmentItem in the database
        List<TreatmentItem> treatmentItemList = treatmentItemRepository.findAll();
        assertThat(treatmentItemList).hasSize(databaseSizeBeforeUpdate);
        TreatmentItem testTreatmentItem = treatmentItemList.get(treatmentItemList.size() - 1);
        assertThat(testTreatmentItem.getInitialServiceDate()).isEqualTo(UPDATED_INITIAL_SERVICE_DATE);
        assertThat(testTreatmentItem.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testTreatmentItem.getTotal()).isEqualTo(UPDATED_TOTAL);

        // Validate the TreatmentItem in Elasticsearch
        verify(mockTreatmentItemSearchRepository, times(1)).save(testTreatmentItem);
    }

    @Test
    @Transactional
    public void updateNonExistingTreatmentItem() throws Exception {
        int databaseSizeBeforeUpdate = treatmentItemRepository.findAll().size();

        // Create the TreatmentItem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTreatmentItemMockMvc.perform(put("/api/treatment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(treatmentItem)))
            .andExpect(status().isBadRequest());

        // Validate the TreatmentItem in the database
        List<TreatmentItem> treatmentItemList = treatmentItemRepository.findAll();
        assertThat(treatmentItemList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TreatmentItem in Elasticsearch
        verify(mockTreatmentItemSearchRepository, times(0)).save(treatmentItem);
    }

    @Test
    @Transactional
    public void deleteTreatmentItem() throws Exception {
        // Initialize the database
        treatmentItemRepository.saveAndFlush(treatmentItem);

        int databaseSizeBeforeDelete = treatmentItemRepository.findAll().size();

        // Get the treatmentItem
        restTreatmentItemMockMvc.perform(delete("/api/treatment-items/{id}", treatmentItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TreatmentItem> treatmentItemList = treatmentItemRepository.findAll();
        assertThat(treatmentItemList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TreatmentItem in Elasticsearch
        verify(mockTreatmentItemSearchRepository, times(1)).deleteById(treatmentItem.getId());
    }

    @Test
    @Transactional
    public void searchTreatmentItem() throws Exception {
        // Initialize the database
        treatmentItemRepository.saveAndFlush(treatmentItem);
        when(mockTreatmentItemSearchRepository.search(queryStringQuery("id:" + treatmentItem.getId())))
            .thenReturn(Collections.singletonList(treatmentItem));
        // Search the treatmentItem
        restTreatmentItemMockMvc.perform(get("/api/_search/treatment-items?query=id:" + treatmentItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(treatmentItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].initialServiceDate").value(hasItem(DEFAULT_INITIAL_SERVICE_DATE.toString())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TreatmentItem.class);
        TreatmentItem treatmentItem1 = new TreatmentItem();
        treatmentItem1.setId(1L);
        TreatmentItem treatmentItem2 = new TreatmentItem();
        treatmentItem2.setId(treatmentItem1.getId());
        assertThat(treatmentItem1).isEqualTo(treatmentItem2);
        treatmentItem2.setId(2L);
        assertThat(treatmentItem1).isNotEqualTo(treatmentItem2);
        treatmentItem1.setId(null);
        assertThat(treatmentItem1).isNotEqualTo(treatmentItem2);
    }
}
