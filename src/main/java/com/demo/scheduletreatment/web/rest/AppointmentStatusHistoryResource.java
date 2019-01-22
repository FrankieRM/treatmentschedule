package com.demo.scheduletreatment.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.demo.scheduletreatment.domain.AppointmentStatusHistory;
import com.demo.scheduletreatment.repository.AppointmentStatusHistoryRepository;
import com.demo.scheduletreatment.repository.search.AppointmentStatusHistorySearchRepository;
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
 * REST controller for managing AppointmentStatusHistory.
 */
@RestController
@RequestMapping("/api")
public class AppointmentStatusHistoryResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentStatusHistoryResource.class);

    private static final String ENTITY_NAME = "appointmentStatusHistory";

    private final AppointmentStatusHistoryRepository appointmentStatusHistoryRepository;

    private final AppointmentStatusHistorySearchRepository appointmentStatusHistorySearchRepository;

    public AppointmentStatusHistoryResource(AppointmentStatusHistoryRepository appointmentStatusHistoryRepository, AppointmentStatusHistorySearchRepository appointmentStatusHistorySearchRepository) {
        this.appointmentStatusHistoryRepository = appointmentStatusHistoryRepository;
        this.appointmentStatusHistorySearchRepository = appointmentStatusHistorySearchRepository;
    }

    /**
     * POST  /appointment-status-histories : Create a new appointmentStatusHistory.
     *
     * @param appointmentStatusHistory the appointmentStatusHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new appointmentStatusHistory, or with status 400 (Bad Request) if the appointmentStatusHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/appointment-status-histories")
    @Timed
    public ResponseEntity<AppointmentStatusHistory> createAppointmentStatusHistory(@RequestBody AppointmentStatusHistory appointmentStatusHistory) throws URISyntaxException {
        log.debug("REST request to save AppointmentStatusHistory : {}", appointmentStatusHistory);
        if (appointmentStatusHistory.getId() != null) {
            throw new BadRequestAlertException("A new appointmentStatusHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppointmentStatusHistory result = appointmentStatusHistoryRepository.save(appointmentStatusHistory);
        appointmentStatusHistorySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/appointment-status-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /appointment-status-histories : Updates an existing appointmentStatusHistory.
     *
     * @param appointmentStatusHistory the appointmentStatusHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated appointmentStatusHistory,
     * or with status 400 (Bad Request) if the appointmentStatusHistory is not valid,
     * or with status 500 (Internal Server Error) if the appointmentStatusHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/appointment-status-histories")
    @Timed
    public ResponseEntity<AppointmentStatusHistory> updateAppointmentStatusHistory(@RequestBody AppointmentStatusHistory appointmentStatusHistory) throws URISyntaxException {
        log.debug("REST request to update AppointmentStatusHistory : {}", appointmentStatusHistory);
        if (appointmentStatusHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppointmentStatusHistory result = appointmentStatusHistoryRepository.save(appointmentStatusHistory);
        appointmentStatusHistorySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, appointmentStatusHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /appointment-status-histories : get all the appointmentStatusHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of appointmentStatusHistories in body
     */
    @GetMapping("/appointment-status-histories")
    @Timed
    public List<AppointmentStatusHistory> getAllAppointmentStatusHistories() {
        log.debug("REST request to get all AppointmentStatusHistories");
        return appointmentStatusHistoryRepository.findAll();
    }

    /**
     * GET  /appointment-status-histories/:id : get the "id" appointmentStatusHistory.
     *
     * @param id the id of the appointmentStatusHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the appointmentStatusHistory, or with status 404 (Not Found)
     */
    @GetMapping("/appointment-status-histories/{id}")
    @Timed
    public ResponseEntity<AppointmentStatusHistory> getAppointmentStatusHistory(@PathVariable Long id) {
        log.debug("REST request to get AppointmentStatusHistory : {}", id);
        Optional<AppointmentStatusHistory> appointmentStatusHistory = appointmentStatusHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(appointmentStatusHistory);
    }

    /**
     * DELETE  /appointment-status-histories/:id : delete the "id" appointmentStatusHistory.
     *
     * @param id the id of the appointmentStatusHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/appointment-status-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteAppointmentStatusHistory(@PathVariable Long id) {
        log.debug("REST request to delete AppointmentStatusHistory : {}", id);

        appointmentStatusHistoryRepository.deleteById(id);
        appointmentStatusHistorySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/appointment-status-histories?query=:query : search for the appointmentStatusHistory corresponding
     * to the query.
     *
     * @param query the query of the appointmentStatusHistory search
     * @return the result of the search
     */
    @GetMapping("/_search/appointment-status-histories")
    @Timed
    public List<AppointmentStatusHistory> searchAppointmentStatusHistories(@RequestParam String query) {
        log.debug("REST request to search AppointmentStatusHistories for query {}", query);
        return StreamSupport
            .stream(appointmentStatusHistorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
