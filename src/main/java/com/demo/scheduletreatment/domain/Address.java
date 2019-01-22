package com.demo.scheduletreatment.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description_address")
    private String descriptionAddress;

    @Column(name = "jhi_references")
    private String references;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter addressType;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter country;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter department;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter province;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter district;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptionAddress() {
        return descriptionAddress;
    }

    public Address descriptionAddress(String descriptionAddress) {
        this.descriptionAddress = descriptionAddress;
        return this;
    }

    public void setDescriptionAddress(String descriptionAddress) {
        this.descriptionAddress = descriptionAddress;
    }

    public String getReferences() {
        return references;
    }

    public Address references(String references) {
        this.references = references;
        return this;
    }

    public void setReferences(String references) {
        this.references = references;
    }

    public Parameter getAddressType() {
        return addressType;
    }

    public Address addressType(Parameter parameter) {
        this.addressType = parameter;
        return this;
    }

    public void setAddressType(Parameter parameter) {
        this.addressType = parameter;
    }

    public Parameter getCountry() {
        return country;
    }

    public Address country(Parameter parameter) {
        this.country = parameter;
        return this;
    }

    public void setCountry(Parameter parameter) {
        this.country = parameter;
    }

    public Parameter getDepartment() {
        return department;
    }

    public Address department(Parameter parameter) {
        this.department = parameter;
        return this;
    }

    public void setDepartment(Parameter parameter) {
        this.department = parameter;
    }

    public Parameter getProvince() {
        return province;
    }

    public Address province(Parameter parameter) {
        this.province = parameter;
        return this;
    }

    public void setProvince(Parameter parameter) {
        this.province = parameter;
    }

    public Parameter getDistrict() {
        return district;
    }

    public Address district(Parameter parameter) {
        this.district = parameter;
        return this;
    }

    public void setDistrict(Parameter parameter) {
        this.district = parameter;
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
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", descriptionAddress='" + getDescriptionAddress() + "'" +
            ", references='" + getReferences() + "'" +
            "}";
    }
}
