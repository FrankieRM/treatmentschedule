package com.demo.scheduletreatment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TreatmentItem.
 */
@Entity
@Table(name = "treatment_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "treatmentitem")
public class TreatmentItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "initial_service_date")
    private Instant initialServiceDate;

    @Column(name = "discount")
    private Double discount;

    @Column(name = "total")
    private Double total;

    @ManyToOne
    @JsonIgnoreProperties("treatmentItems")
    private Treatment treatment;

    @OneToOne    @JoinColumn(unique = true)
    private Parameter paymentStatus;

    @OneToMany(mappedBy = "treatmentItem")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Item> items = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getInitialServiceDate() {
        return initialServiceDate;
    }

    public TreatmentItem initialServiceDate(Instant initialServiceDate) {
        this.initialServiceDate = initialServiceDate;
        return this;
    }

    public void setInitialServiceDate(Instant initialServiceDate) {
        this.initialServiceDate = initialServiceDate;
    }

    public Double getDiscount() {
        return discount;
    }

    public TreatmentItem discount(Double discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Double getTotal() {
        return total;
    }

    public TreatmentItem total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Treatment getTreatment() {
        return treatment;
    }

    public TreatmentItem treatment(Treatment treatment) {
        this.treatment = treatment;
        return this;
    }

    public void setTreatment(Treatment treatment) {
        this.treatment = treatment;
    }

    public Parameter getPaymentStatus() {
        return paymentStatus;
    }

    public TreatmentItem paymentStatus(Parameter parameter) {
        this.paymentStatus = parameter;
        return this;
    }

    public void setPaymentStatus(Parameter parameter) {
        this.paymentStatus = parameter;
    }

    public Set<Item> getItems() {
        return items;
    }

    public TreatmentItem items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public TreatmentItem addItem(Item item) {
        this.items.add(item);
        item.setTreatmentItem(this);
        return this;
    }

    public TreatmentItem removeItem(Item item) {
        this.items.remove(item);
        item.setTreatmentItem(null);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
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
        TreatmentItem treatmentItem = (TreatmentItem) o;
        if (treatmentItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), treatmentItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TreatmentItem{" +
            "id=" + getId() +
            ", initialServiceDate='" + getInitialServiceDate() + "'" +
            ", discount=" + getDiscount() +
            ", total=" + getTotal() +
            "}";
    }
}
