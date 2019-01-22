package com.demo.scheduletreatment.repository.search;

import com.demo.scheduletreatment.domain.Person;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Person entity.
 */
public interface PersonSearchRepository extends ElasticsearchRepository<Person, Long> {
}
