package com.suh.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="DESIGNS")
public class Design {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private int id;
	private int designType;
	private int rank;
	private String description;
	private boolean publish;
	private int designsOwner;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated ;
	
//	@OneToMany(cascade = CascadeType.ALL)
//	private List<RoomDetails> listRoomDetails;
//	

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(name="design_type")
	public int getDesignType() {
		return designType;
	}
	public void setDesignType(int designType) {
		this.designType = designType;
	}
	
	@Column(name="rank")
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	
	@Column(name="publish")
	public boolean getPublish() {
		return publish;
	}
	public void setPublish(boolean publish) {
		this.publish = publish;
	}
	
	@Column(name="designs_owner")
	public int getDesignsOwner() {
		return designsOwner;
	}
	public void setDesignsOwner(int designsOwner) {
		this.designsOwner = designsOwner;
	}
	
	@Column(name="description")
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

//	public List<RoomDetails> getListRoomDetails() {
//		return listRoomDetails;
//	}
//	public void setListRoomDetails(List<RoomDetails> listRoomDetails) {
//		this.listRoomDetails = listRoomDetails;
//	}

}
