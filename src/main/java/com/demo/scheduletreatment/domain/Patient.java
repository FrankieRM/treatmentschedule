package com.demo.scheduletreatment.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "patient")
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "intern_number")
    private String internNumber;

    @Column(name = "commune")
    private String commune;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "employer")
    private String employer;

    @Column(name = "representative")
    private String representative;

    @Column(name = "reference")
    private String reference;

    @Column(name = "observations")
    private String observations;

    @OneToOne    @JoinColumn(unique = true)
    private Person person;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter sex;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInternNumber() {
        return internNumber;
    }

    public Patient internNumber(String internNumber) {
        this.internNumber = internNumber;
        return this;
    }

    public void setInternNumber(String internNumber) {
        this.internNumber = internNumber;
    }

    public String getCommune() {
        return commune;
    }

    public Patient commune(String commune) {
        this.commune = commune;
        return this;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getOccupation() {
        return occupation;
    }

    public Patient occupation(String occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getEmployer() {
        return employer;
    }

    public Patient employer(String employer) {
        this.employer = employer;
        return this;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public String getRepresentative() {
        return representative;
    }

    public Patient representative(String representative) {
        this.representative = representative;
        return this;
    }

    public void setRepresentative(String representative) {
        this.representative = representative;
    }

    public String getReference() {
        return reference;
    }

    public Patient reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getObservations() {
        return observations;
    }

    public Patient observations(String observations) {
        this.observations = observations;
        return this;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Person getPerson() {
        return person;
    }

    public Patient person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Parameter getSex() {
        return sex;
    }

    public Patient sex(Parameter parameter) {
        this.sex = parameter;
        return this;
    }

    public void setSex(Parameter parameter) {
        this.sex = parameter;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", internNumber='" + getInternNumber() + "'" +
            ", commune='" + getCommune() + "'" +
            ", occupation='" + getOccupation() + "'" +
            ", employer='" + getEmployer() + "'" +
            ", representative='" + getRepresentative() + "'" +
            ", reference='" + getReference() + "'" +
            ", observations='" + getObservations() + "'" +
            "}";
    }
}
