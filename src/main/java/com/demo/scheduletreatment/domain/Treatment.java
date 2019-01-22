package com.demo.scheduletreatment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Treatment.
 */
@Entity
@Table(name = "treatment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "treatment")
public class Treatment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "discount")
    private Double discount;

    @Column(name = "warnings_about_patient")
    private String warningsAboutPatient;

    @OneToOne    @JoinColumn(unique = true)
    private Schedule schedule;

    @OneToMany(mappedBy = "treatment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TreatmentItem> treatmentItems = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDiscount() {
        return discount;
    }

    public Treatment discount(Double discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getWarningsAboutPatient() {
        return warningsAboutPatient;
    }

    public Treatment warningsAboutPatient(String warningsAboutPatient) {
        this.warningsAboutPatient = warningsAboutPatient;
        return this;
    }

    public void setWarningsAboutPatient(String warningsAboutPatient) {
        this.warningsAboutPatient = warningsAboutPatient;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Treatment schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Set<TreatmentItem> getTreatmentItems() {
        return treatmentItems;
    }

    public Treatment treatmentItems(Set<TreatmentItem> treatmentItems) {
        this.treatmentItems = treatmentItems;
        return this;
    }

    public Treatment addTreatmentItem(TreatmentItem treatmentItem) {
        this.treatmentItems.add(treatmentItem);
        treatmentItem.setTreatment(this);
        return this;
    }

    public Treatment removeTreatmentItem(TreatmentItem treatmentItem) {
        this.treatmentItems.remove(treatmentItem);
        treatmentItem.setTreatment(null);
        return this;
    }

    public void setTreatmentItems(Set<TreatmentItem> treatmentItems) {
        this.treatmentItems = treatmentItems;
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
        Treatment treatment = (Treatment) o;
        if (treatment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), treatment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Treatment{" +
            "id=" + getId() +
            ", discount=" + getDiscount() +
            ", warningsAboutPatient='" + getWarningsAboutPatient() + "'" +
            "}";
    }
}
