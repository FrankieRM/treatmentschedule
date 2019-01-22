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
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "document_number")
    private String documentNumber;

    @Column(name = "gender")
    private String gender;

    @Column(name = "birth_day")
    private Instant birthDay;

    @Column(name = "years")
    private Integer years;

    @OneToOne    @JoinColumn(unique = true)
    private Address address;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter documentType;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contact> contacts = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Person firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Person lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public Person documentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
        return this;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getGender() {
        return gender;
    }

    public Person gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Instant getBirthDay() {
        return birthDay;
    }

    public Person birthDay(Instant birthDay) {
        this.birthDay = birthDay;
        return this;
    }

    public void setBirthDay(Instant birthDay) {
        this.birthDay = birthDay;
    }

    public Integer getYears() {
        return years;
    }

    public Person years(Integer years) {
        this.years = years;
        return this;
    }

    public void setYears(Integer years) {
        this.years = years;
    }

    public Address getAddress() {
        return address;
    }

    public Person address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Parameter getDocumentType() {
        return documentType;
    }

    public Person documentType(Parameter parameter) {
        this.documentType = parameter;
        return this;
    }

    public void setDocumentType(Parameter parameter) {
        this.documentType = parameter;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public Person contacts(Set<Contact> contacts) {
        this.contacts = contacts;
        return this;
    }

    public Person addContact(Contact contact) {
        this.contacts.add(contact);
        contact.setPerson(this);
        return this;
    }

    public Person removeContact(Contact contact) {
        this.contacts.remove(contact);
        contact.setPerson(null);
        return this;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
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
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthDay='" + getBirthDay() + "'" +
            ", years=" + getYears() +
            "}";
    }
}
