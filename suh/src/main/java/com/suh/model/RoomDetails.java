package com.suh.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
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

@Entity
@Table(name = "Room_Details")
public class RoomDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "roomDetailsID")
	private int roomDetailsID;
	private String roomType;
	private long length;
	private long breadth;
	private long height;
	private String roomImage;
	private String roomColor;

	//@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id", nullable = false)
	private Project project;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated;

	@ManyToOne(cascade = CascadeType.ALL)
	private Design design;

	public int getRoomDetailsID() {
		return roomDetailsID;
	}

	public void setRoomDetailsID(int roomDetailssID) {
		this.roomDetailsID = roomDetailssID;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public String getRoomImg() {
		return roomImage;
	}

	public void setRoomImg(String roomImage) {
		this.roomImage = roomImage;
	}

	public String getRoomColor() {
		return roomColor;
	}

	public void setRoomColor(String roomColor) {
		this.roomColor = roomColor;
	}

	// @JsonIgnore
	// @ManyToOne //(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	// @JoinColumn(name="id") //, insertable=true, updatable=false)
	// public Project getRoomDetails() {
	// return roomDetails;
	// }
	//
	// public void setRoomDetails(Project roomDetails) {
	// this.roomDetails = roomDetails;
	// }

	public java.util.Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(java.util.Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getRoomImage() {
		return roomImage;
	}

	public void setRoomImage(String roomImage) {
		this.roomImage = roomImage;
	}

	public Design getDesign() {
		return design;
	}

	public void setDesign(Design design) {
		this.design = design;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public long getLength() {
		return length;
	}

	public void setLength(long length) {
		this.length = length;
	}

	public long getBreadth() {
		return breadth;
	}

	public void setBreadth(long breadth) {
		this.breadth = breadth;
	}

	public long getHeight() {
		return height;
	}

	public void setHeight(long height) {
		this.height = height;
	}

}
