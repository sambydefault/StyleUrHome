package com.boot.model;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class ServiceOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long orderMasterId;
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long orderId;
	private Date serviceRequestedDate;
	private String serviceLocation;
	private String serviceInfo;
	private String additionalComment;
	private String timeSlot;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private java.util.Date dateCreated;
	private String userPhoneNumber;
	private String userAddress;

	@OneToOne(cascade = CascadeType.ALL)
	private User user;

	private String orderStatus;

	@ManyToOne(cascade = CascadeType.ALL)
	private Product service;

	@OneToOne(cascade = CascadeType.ALL)
	private Vendor vendor;

	@OneToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<VendorOrderAction> vendorOrderAction;

	public String getServiceInfo() {
		return serviceInfo;
	}

	public void setServiceInfo(String serviceInfo) {
		this.serviceInfo = serviceInfo;
	}

	public String getAdditionalComment() {
		return additionalComment;
	}

	public void setAdditionalComment(String additionalComment) {
		this.additionalComment = additionalComment;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public List<VendorOrderAction> getVendorOrderAction() {
		return vendorOrderAction;
	}

	public void setVendorOrderAction(List<VendorOrderAction> vendorOrderAction) {
		this.vendorOrderAction = vendorOrderAction;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public Product getService() {
		return service;
	}

	public void setService(Product service) {
		this.service = service;
	}

	public long getOrderMasterId() {
		return orderMasterId;
	}

	public void setOrderMasterId(long orderMasterId) {
		this.orderMasterId = orderMasterId;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Date getServiceRequestedDate() {
		return serviceRequestedDate;
	}

	public void setServiceRequestedDate(Date serviceRequestedDate) {
		this.serviceRequestedDate = serviceRequestedDate;
	}

	public String getServiceLocation() {
		return serviceLocation;
	}

	public void setServiceLocation(String serviceLocation) {
		this.serviceLocation = serviceLocation;
	}

	public java.util.Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(java.util.Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getUserPhoneNumber() {
		return userPhoneNumber;
	}

	public void setUserPhoneNumber(String userPhoneNumber) {
		this.userPhoneNumber = userPhoneNumber;
	}

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

}
