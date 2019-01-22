package com.demo.scheduletreatment.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.demo.scheduletreatment.domain.TreatmentItem;
import com.demo.scheduletreatment.repository.TreatmentItemRepository;
import com.demo.scheduletreatment.repository.search.TreatmentItemSearchRepository;
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
 * REST controller for managing TreatmentItem.
 */
@RestController
@RequestMapping("/api")
public class TreatmentItemResource {

    private final Logger log = LoggerFactory.getLogger(TreatmentItemResource.class);

    private static final String ENTITY_NAME = "treatmentItem";

    private final TreatmentItemRepository treatmentItemRepository;

    private final TreatmentItemSearchRepository treatmentItemSearchRepository;

    public TreatmentItemResource(TreatmentItemRepository treatmentItemRepository, TreatmentItemSearchRepository treatmentItemSearchRepository) {
        this.treatmentItemRepository = treatmentItemRepository;
        this.treatmentItemSearchRepository = treatmentItemSearchRepository;
    }

    /**
     * POST  /treatment-items : Create a new treatmentItem.
     *
     * @param treatmentItem the treatmentItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new treatmentItem, or with status 400 (Bad Request) if the treatmentItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/treatment-items")
    @Timed
    public ResponseEntity<TreatmentItem> createTreatmentItem(@RequestBody TreatmentItem treatmentItem) throws URISyntaxException {
        log.debug("REST request to save TreatmentItem : {}", treatmentItem);
        if (treatmentItem.getId() != null) {
            throw new BadRequestAlertException("A new treatmentItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TreatmentItem result = treatmentItemRepository.save(treatmentItem);
        treatmentItemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/treatment-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /treatment-items : Updates an existing treatmentItem.
     *
     * @param treatmentItem the treatmentItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated treatmentItem,
     * or with status 400 (Bad Request) if the treatmentItem is not valid,
     * or with status 500 (Internal Server Error) if the treatmentItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/treatment-items")
    @Timed
    public ResponseEntity<TreatmentItem> updateTreatmentItem(@RequestBody TreatmentItem treatmentItem) throws URISyntaxException {
        log.debug("REST request to update TreatmentItem : {}", treatmentItem);
        if (treatmentItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TreatmentItem result = treatmentItemRepository.save(treatmentItem);
        treatmentItemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, treatmentItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /treatment-items : get all the treatmentItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of treatmentItems in body
     */
    @GetMapping("/treatment-items")
    @Timed
    public List<TreatmentItem> getAllTreatmentItems() {
        log.debug("REST request to get all TreatmentItems");
        return treatmentItemRepository.findAll();
    }

    /**
     * GET  /treatment-items/:id : get the "id" treatmentItem.
     *
     * @param id the id of the treatmentItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the treatmentItem, or with status 404 (Not Found)
     */
    @GetMapping("/treatment-items/{id}")
    @Timed
    public ResponseEntity<TreatmentItem> getTreatmentItem(@PathVariable Long id) {
        log.debug("REST request to get TreatmentItem : {}", id);
        Optional<TreatmentItem> treatmentItem = treatmentItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(treatmentItem);
    }

    /**
     * DELETE  /treatment-items/:id : delete the "id" treatmentItem.
     *
     * @param id the id of the treatmentItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/treatment-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteTreatmentItem(@PathVariable Long id) {
        log.debug("REST request to delete TreatmentItem : {}", id);

        treatmentItemRepository.deleteById(id);
        treatmentItemSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/treatment-items?query=:query : search for the treatmentItem corresponding
     * to the query.
     *
     * @param query the query of the treatmentItem search
     * @return the result of the search
     */
    @GetMapping("/_search/treatment-items")
    @Timed
    public List<TreatmentItem> searchTreatmentItems(@RequestParam String query) {
        log.debug("REST request to search TreatmentItems for query {}", query);
        return StreamSupport
            .stream(treatmentItemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
