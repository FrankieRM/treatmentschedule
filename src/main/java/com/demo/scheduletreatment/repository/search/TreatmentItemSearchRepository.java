package com.demo.scheduletreatment.repository.search;

import com.demo.scheduletreatment.domain.TreatmentItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TreatmentItem entity.
 */
public interface TreatmentItemSearchRepository extends ElasticsearchRepository<TreatmentItem, Long> {
}
