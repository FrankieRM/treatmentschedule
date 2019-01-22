package com.demo.scheduletreatment.repository.search;

import com.demo.scheduletreatment.domain.Parameter;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Parameter entity.
 */
public interface ParameterSearchRepository extends ElasticsearchRepository<Parameter, Long> {
}
