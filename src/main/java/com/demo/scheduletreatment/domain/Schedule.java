package com.demo.scheduletreatment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "schedule")
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "initial_appointment_date", nullable = false)
    private Instant initialAppointmentDate;

    @NotNull
    @Column(name = "final_appointment_date", nullable = false)
    private Instant finalAppointmentDate;

    @Column(name = "duration")
    private Instant duration;

    @OneToOne    @JoinColumn(unique = true)
    private Employee employee;

    @OneToOne    @JoinColumn(unique = true)
    private Patient patient;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter situation;

    @OneToMany(mappedBy = "schedule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AppointmentStatusHistory> appointmentStatusHistories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getInitialAppointmentDate() {
        return initialAppointmentDate;
    }

    public Schedule initialAppointmentDate(Instant initialAppointmentDate) {
        this.initialAppointmentDate = initialAppointmentDate;
        return this;
    }

    public void setInitialAppointmentDate(Instant initialAppointmentDate) {
        this.initialAppointmentDate = initialAppointmentDate;
    }

    public Instant getFinalAppointmentDate() {
        return finalAppointmentDate;
    }

    public Schedule finalAppointmentDate(Instant finalAppointmentDate) {
        this.finalAppointmentDate = finalAppointmentDate;
        return this;
    }

    public void setFinalAppointmentDate(Instant finalAppointmentDate) {
        this.finalAppointmentDate = finalAppointmentDate;
    }

    public Instant getDuration() {
        return duration;
    }

    public Schedule duration(Instant duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Instant duration) {
        this.duration = duration;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Schedule employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Patient getPatient() {
        return patient;
    }

    public Schedule patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Parameter getSituation() {
        return situation;
    }

    public Schedule situation(Parameter parameter) {
        this.situation = parameter;
        return this;
    }

    public void setSituation(Parameter parameter) {
        this.situation = parameter;
    }

    public Set<AppointmentStatusHistory> getAppointmentStatusHistories() {
        return appointmentStatusHistories;
    }

    public Schedule appointmentStatusHistories(Set<AppointmentStatusHistory> appointmentStatusHistories) {
        this.appointmentStatusHistories = appointmentStatusHistories;
        return this;
    }

    public Schedule addAppointmentStatusHistory(AppointmentStatusHistory appointmentStatusHistory) {
        this.appointmentStatusHistories.add(appointmentStatusHistory);
        appointmentStatusHistory.setSchedule(this);
        return this;
    }

    public Schedule removeAppointmentStatusHistory(AppointmentStatusHistory appointmentStatusHistory) {
        this.appointmentStatusHistories.remove(appointmentStatusHistory);
        appointmentStatusHistory.setSchedule(null);
        return this;
    }

    public void setAppointmentStatusHistories(Set<AppointmentStatusHistory> appointmentStatusHistories) {
        this.appointmentStatusHistories = appointmentStatusHistories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Schedule schedule = (Schedule) o;
        if (schedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", initialAppointmentDate='" + getInitialAppointmentDate() + "'" +
            ", finalAppointmentDate='" + getFinalAppointmentDate() + "'" +
            ", duration='" + getDuration() + "'" +
            "}";
    }
}
