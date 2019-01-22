package com.demo.scheduletreatment.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TreatmentSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TreatmentSearchRepositoryMockConfiguration {

    @MockBean
    private TreatmentSearchRepository mockTreatmentSearchRepository;

}
