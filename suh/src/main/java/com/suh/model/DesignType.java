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
public class DesignType {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int designTypeId;
	private String name;
	private String description;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated;

	public int getDesignTypeId() {
		return designTypeId;
	}

	public void setDesignTypeId(int designTypeId) {
		this.designTypeId = designTypeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public java.util.Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(java.util.Date dateCreated) {
		this.dateCreated = dateCreated;
	}
}
