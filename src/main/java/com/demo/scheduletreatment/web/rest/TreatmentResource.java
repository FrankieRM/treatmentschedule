package com.demo.scheduletreatment.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.demo.scheduletreatment.domain.Treatment;
import com.demo.scheduletreatment.repository.TreatmentRepository;
import com.demo.scheduletreatment.repository.search.TreatmentSearchRepository;
import com.demo.scheduletreatment.web.rest.errors.BadRequestAlertException;
import com.demo.scheduletreatment.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Treatment.
 */
@RestController
@RequestMapping("/api")
public class TreatmentResource {

    private final Logger log = LoggerFactory.getLogger(TreatmentResource.class);

    private static final String ENTITY_NAME = "treatment";

    private final TreatmentRepository treatmentRepository;

    private final TreatmentSearchRepository treatmentSearchRepository;

    public TreatmentResource(TreatmentRepository treatmentRepository, TreatmentSearchRepository treatmentSearchRepository) {
        this.treatmentRepository = treatmentRepository;
        this.treatmentSearchRepository = treatmentSearchRepository;
    }

    /**
     * POST  /treatments : Create a new treatment.
     *
     * @param treatment the treatment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new treatment, or with status 400 (Bad Request) if the treatment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/treatments")
    @Timed
    public ResponseEntity<Treatment> createTreatment(@RequestBody Treatment treatment) throws URISyntaxException {
        log.debug("REST request to save Treatment : {}", treatment);
        if (treatment.getId() != null) {
            throw new BadRequestAlertException("A new treatment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Treatment result = treatmentRepository.save(treatment);
        treatmentSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/treatments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /treatments : Updates an existing treatment.
     *
     * @param treatment the treatment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated treatment,
     * or with status 400 (Bad Request) if the treatment is not valid,
     * or with status 500 (Internal Server Error) if the treatment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/treatments")
    @Timed
    public ResponseEntity<Treatment> updateTreatment(@RequestBody Treatment treatment) throws URISyntaxException {
        log.debug("REST request to update Treatment : {}", treatment);
        if (treatment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Treatment result = treatmentRepository.save(treatment);
        treatmentSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, treatment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /treatments : get all the treatments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of treatments in body
     */
    @GetMapping("/treatments")
    @Timed
    public List<Treatment> getAllTreatments() {
        log.debug("REST request to get all Treatments");
        return treatmentRepository.findAll();
    }

    /**
     * GET  /treatments/:id : get the "id" treatment.
     *
     * @param id the id of the treatment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the treatment, or with status 404 (Not Found)
     */
    @GetMapping("/treatments/{id}")
    @Timed
    public ResponseEntity<Treatment> getTreatment(@PathVariable Long id) {
        log.debug("REST request to get Treatment : {}", id);
        Optional<Treatment> treatment = treatmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(treatment);
    }

    /**
     * DELETE  /treatments/:id : delete the "id" treatment.
     *
     * @param id the id of the treatment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/treatments/{id}")
    @Timed
    public ResponseEntity<Void> deleteTreatment(@PathVariable Long id) {
        log.debug("REST request to delete Treatment : {}", id);

        treatmentRepository.deleteById(id);
        treatmentSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/treatments?query=:query : search for the treatment corresponding
     * to the query.
     *
     * @param query the query of the treatment search
     * @return the result of the search
     */
    @GetMapping("/_search/treatments")
    @Timed
    public List<Treatment> searchTreatments(@RequestParam String query) {
        log.debug("REST request to search Treatments for query {}", query);
        return StreamSupport
            .stream(treatmentSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
