package com.suh.model;

import java.math.RoundingMode;
import java.text.DecimalFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="UNITS")
public class Unit {

	private int id;
	private String name;
	private String description;
	private String type;
	private double width;
	private double height;
	private double length;
	private String color;
	private String img;
	//private double price;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated ;

	
	@Id
	@GeneratedValue
	@Column(name="id")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(name="name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name="description")
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Column(name="type")
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	@Column(name="width")
	public double getWidth() {
		return (long)(100.0*width)/100.0;
	}
	public void setWidth(double width) {
		this.width = width;
	}
	
	@Column(name="height")
	public double getHeight() {
		return (long)(100.0*height)/100.0;
	}
	public void setHeight(double height) {
		this.height = height;
	}
	
	@Column(name="length")
	public double getLength() {
		return (long)(100.0*length)/100.0;
	}
	public void setLength(double length) {
		this.length = length;
	}
	
	@Column(name="color")
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
	@Column(name="img")
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	
	public java.util.Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(java.util.Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	
//	public double getPrice() {
//		return price;
//	}
//	public void setPrice(double price) {
//		this.price = price;
//	}

}
