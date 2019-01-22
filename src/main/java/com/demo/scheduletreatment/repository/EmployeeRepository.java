package com.demo.scheduletreatment.repository;

import com.demo.scheduletreatment.domain.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "select distinct employee from Employee employee left join fetch employee.specialties",
        countQuery = "select count(distinct employee) from Employee employee")
    Page<Employee> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct employee from Employee employee left join fetch employee.specialties")
    List<Employee> findAllWithEagerRelationships();

    @Query("select employee from Employee employee left join fetch employee.specialties where employee.id =:id")
    Optional<Employee> findOneWithEagerRelationships(@Param("id") Long id);

}
