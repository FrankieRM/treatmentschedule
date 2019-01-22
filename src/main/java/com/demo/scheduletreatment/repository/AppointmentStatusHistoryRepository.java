package com.demo.scheduletreatment.repository;

import com.demo.scheduletreatment.domain.AppointmentStatusHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AppointmentStatusHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentStatusHistoryRepository extends JpaRepository<AppointmentStatusHistory, Long> {

}
