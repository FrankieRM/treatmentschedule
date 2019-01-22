package com.demo.scheduletreatment.repository.search;

import com.demo.scheduletreatment.domain.AppointmentStatusHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AppointmentStatusHistory entity.
 */
public interface AppointmentStatusHistorySearchRepository extends ElasticsearchRepository<AppointmentStatusHistory, Long> {
}
