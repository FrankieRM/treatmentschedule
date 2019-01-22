package com.demo.scheduletreatment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Parameter.
 */
@Entity
@Table(name = "parameter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "parameter")
public class Parameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_value", nullable = false)
    private String value;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Parameter parent;

    @ManyToMany(mappedBy = "specialties")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Employee> employees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public Parameter value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean isStatus() {
        return status;
    }

    public Parameter status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Parameter getParent() {
        return parent;
    }

    public Parameter parent(Parameter parameter) {
        this.parent = parameter;
        return this;
    }

    public void setParent(Parameter parameter) {
        this.parent = parameter;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Parameter employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Parameter addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.getSpecialties().add(this);
        return this;
    }

    public Parameter removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.getSpecialties().remove(this);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
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
        Parameter parameter = (Parameter) o;
        if (parameter.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parameter.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parameter{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
