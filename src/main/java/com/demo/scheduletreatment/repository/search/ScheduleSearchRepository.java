package com.demo.scheduletreatment.repository.search;

import com.demo.scheduletreatment.domain.Schedule;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Schedule entity.
 */
public interface ScheduleSearchRepository extends ElasticsearchRepository<Schedule, Long> {
}
