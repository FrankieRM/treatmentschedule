package com.demo.scheduletreatment.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AppointmentStatusHistory.
 */
@Entity
@Table(name = "appointment_status_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "appointmentstatushistory")
public class AppointmentStatusHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "modify_date")
    private Instant modifyDate;

    @ManyToOne
    @JsonIgnoreProperties("appointmentStatusHistories")
    private Schedule schedule;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter appointmentStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getModifyDate() {
        return modifyDate;
    }

    public AppointmentStatusHistory modifyDate(Instant modifyDate) {
        this.modifyDate = modifyDate;
        return this;
    }

    public void setModifyDate(Instant modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public AppointmentStatusHistory schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Parameter getAppointmentStatus() {
        return appointmentStatus;
    }

    public AppointmentStatusHistory appointmentStatus(Parameter parameter) {
        this.appointmentStatus = parameter;
        return this;
    }

    public void setAppointmentStatus(Parameter parameter) {
        this.appointmentStatus = parameter;
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
        AppointmentStatusHistory appointmentStatusHistory = (AppointmentStatusHistory) o;
        if (appointmentStatusHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointmentStatusHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppointmentStatusHistory{" +
            "id=" + getId() +
            ", modifyDate='" + getModifyDate() + "'" +
            "}";
    }
}
