package com.demo.scheduletreatment.repository;

import com.demo.scheduletreatment.domain.TreatmentItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TreatmentItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TreatmentItemRepository extends JpaRepository<TreatmentItem, Long> {

}
