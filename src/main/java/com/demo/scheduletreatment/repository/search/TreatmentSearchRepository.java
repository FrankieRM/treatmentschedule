package com.demo.scheduletreatment.repository.search;

import com.demo.scheduletreatment.domain.Treatment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Treatment entity.
 */
public interface TreatmentSearchRepository extends ElasticsearchRepository<Treatment, Long> {
}
