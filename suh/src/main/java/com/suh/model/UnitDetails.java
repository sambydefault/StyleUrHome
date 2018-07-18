package com.suh.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
//import com.google.gson.annotations.Expose;

@Entity
@Table(name="Unit_Details")
public class UnitDetails {
	
	private int unitDetailsID;
	private int designID;	
	private String unit;
	private double length;
	private double breadth;
	private double height;
	private String img;
	private String type;
	private String color;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated ;


	//private Project unitDeTails;
	
	//private RoomDetails roomDetails;
		
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="unitDetailsID")
	public int getUnitDetailsID() {
		return unitDetailsID;
	}
		
	public void setUnitDetailsID(int unitDetailsID) {
		this.unitDetailsID = unitDetailsID;
	}

	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public double getLength() {
		return length;
	}
	public void setLength(double length) {
		this.length = length;
	}
	public double getBreadth() {
		return breadth;
	}
	public void setBreadth(double breadth) {
		this.breadth = breadth;
	}
	public double getHeight() {
		return height;
	}
	public void setHeight(double height) {
		this.height = height;
	}
	public int getDesignID() {
		return designID;
	}
	public void setDesignID(int designID) {
		this.designID = designID;
	}

//	@JsonIgnore
//	@ManyToOne //(fetch = FetchType.EAGER, cascade=CascadeType.ALL) 
//	@JoinColumn(name="id") //,  insertable=true, updatable=false)
//	public Project getUnitDetails() {
//		return unitDeTails;
//	}
//
//	public void setUnitDetails(Project unitDetails) {
//		this.unitDeTails = unitDetails;
//	}
//
//	@JsonIgnore
//	@ManyToOne 
//	@JoinColumn(name="roomDetailsID") 
//	public RoomDetails getRoomDetails() {
//		return roomDetails;
//	}
//
//	public void setRoomDetails(RoomDetails roomDetails) {
//		this.roomDetails = roomDetails;
//	}
	
	public java.util.Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(java.util.Date dateCreated) {
		this.dateCreated = dateCreated;
	}


}
