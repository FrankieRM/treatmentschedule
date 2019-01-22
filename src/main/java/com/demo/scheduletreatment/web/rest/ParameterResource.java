package com.demo.scheduletreatment.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.demo.scheduletreatment.domain.Parameter;
import com.demo.scheduletreatment.repository.ParameterRepository;
import com.demo.scheduletreatment.repository.search.ParameterSearchRepository;
import com.demo.scheduletreatment.web.rest.errors.BadRequestAlertException;
import com.demo.scheduletreatment.web.rest.util.HeaderUtil;
import com.demo.scheduletreatment.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Parameter.
 */
@RestController
@RequestMapping("/api")
public class ParameterResource {

    private final Logger log = LoggerFactory.getLogger(ParameterResource.class);

    private static final String ENTITY_NAME = "parameter";

    private final ParameterRepository parameterRepository;

    private final ParameterSearchRepository parameterSearchRepository;

    public ParameterResource(ParameterRepository parameterRepository, ParameterSearchRepository parameterSearchRepository) {
        this.parameterRepository = parameterRepository;
        this.parameterSearchRepository = parameterSearchRepository;
    }

    /**
     * POST  /parameters : Create a new parameter.
     *
     * @param parameter the parameter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parameter, or with status 400 (Bad Request) if the parameter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parameters")
    @Timed
    public ResponseEntity<Parameter> createParameter(@Valid @RequestBody Parameter parameter) throws URISyntaxException {
        log.debug("REST request to save Parameter : {}", parameter);
        if (parameter.getId() != null) {
            throw new BadRequestAlertException("A new parameter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parameter result = parameterRepository.save(parameter);
        parameterSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parameters : Updates an existing parameter.
     *
     * @param parameter the parameter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parameter,
     * or with status 400 (Bad Request) if the parameter is not valid,
     * or with status 500 (Internal Server Error) if the parameter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parameters")
    @Timed
    public ResponseEntity<Parameter> updateParameter(@Valid @RequestBody Parameter parameter) throws URISyntaxException {
        log.debug("REST request to update Parameter : {}", parameter);
        if (parameter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parameter result = parameterRepository.save(parameter);
        parameterSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parameter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parameters : get all the parameters.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of parameters in body
     */
    @GetMapping("/parameters")
    @Timed
    public ResponseEntity<List<Parameter>> getAllParameters(Pageable pageable) {
        log.debug("REST request to get a page of Parameters");
        Page<Parameter> page = parameterRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/parameters");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /parameters/:id : get the "id" parameter.
     *
     * @param id the id of the parameter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parameter, or with status 404 (Not Found)
     */
    @GetMapping("/parameters/{id}")
    @Timed
    public ResponseEntity<Parameter> getParameter(@PathVariable Long id) {
        log.debug("REST request to get Parameter : {}", id);
        Optional<Parameter> parameter = parameterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parameter);
    }

    /**
     * DELETE  /parameters/:id : delete the "id" parameter.
     *
     * @param id the id of the parameter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteParameter(@PathVariable Long id) {
        log.debug("REST request to delete Parameter : {}", id);

        parameterRepository.deleteById(id);
        parameterSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parameters?query=:query : search for the parameter corresponding
     * to the query.
     *
     * @param query the query of the parameter search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/parameters")
    @Timed
    public ResponseEntity<List<Parameter>> searchParameters(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Parameters for query {}", query);
        Page<Parameter> page = parameterSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/parameters");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
