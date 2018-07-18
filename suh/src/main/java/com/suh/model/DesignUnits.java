package com.suh.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class DesignUnits {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long designUnitsID;
	private long designID;
	private long unitsID;
	private int quantity;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated;

	public long getDesignUnitsID() {
		return designUnitsID;
	}

	public void setDesignUnitsID(long designUnitsID) {
		this.designUnitsID = designUnitsID;
	}

	public long getDesignID() {
		return designID;
	}

	public void setDesignID(long designID) {
		this.designID = designID;
	}

	public long getUnitsID() {
		return unitsID;
	}

	public void setUnitsID(long unitsID) {
		this.unitsID = unitsID;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public java.util.Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(java.util.Date dateCreated) {
		this.dateCreated = dateCreated;
	}

}
