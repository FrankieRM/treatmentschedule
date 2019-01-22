package com.demo.scheduletreatment.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "position")
    private String position;

    @Column(name = "jhi_degree")
    private String degree;

    @OneToOne    @JoinColumn(unique = true)
    private Person person;

    @OneToOne    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Address workPlaceAddress;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employee_specialty",
               joinColumns = @JoinColumn(name = "employees_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "specialties_id", referencedColumnName = "id"))
    private Set<Parameter> specialties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public Employee position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDegree() {
        return degree;
    }

    public Employee degree(String degree) {
        this.degree = degree;
        return this;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public Person getPerson() {
        return person;
    }

    public Employee person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public User getUser() {
        return user;
    }

    public Employee user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getWorkPlaceAddress() {
        return workPlaceAddress;
    }

    public Employee workPlaceAddress(Address address) {
        this.workPlaceAddress = address;
        return this;
    }

    public void setWorkPlaceAddress(Address address) {
        this.workPlaceAddress = address;
    }

    public Set<Parameter> getSpecialties() {
        return specialties;
    }

    public Employee specialties(Set<Parameter> parameters) {
        this.specialties = parameters;
        return this;
    }

    public Employee addSpecialty(Parameter parameter) {
        this.specialties.add(parameter);
        parameter.getEmployees().add(this);
        return this;
    }

    public Employee removeSpecialty(Parameter parameter) {
        this.specialties.remove(parameter);
        parameter.getEmployees().remove(this);
        return this;
    }

    public void setSpecialties(Set<Parameter> parameters) {
        this.specialties = parameters;
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", position='" + getPosition() + "'" +
            ", degree='" + getDegree() + "'" +
            "}";
    }
}
