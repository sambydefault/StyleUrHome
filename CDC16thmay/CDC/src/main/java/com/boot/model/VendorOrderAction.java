package com.boot.model;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class VendorOrderAction {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long orderId;

	@ManyToOne(cascade = CascadeType.ALL)
	private Product service;

	@ManyToOne(cascade = CascadeType.ALL)
	private User user;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonBackReference
	private ServiceOrder serviceOrder;

	public ServiceOrder getServiceOrder() {
		return serviceOrder;
	}

	public void setServiceOrder(ServiceOrder serviceOrder) {
		this.serviceOrder = serviceOrder;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	private Vendor vendor;

	
	private String userStatus;
	
	private String vendorApprovalStatus;

	public String getVendorApprovalStatus() {
		return vendorApprovalStatus;
	}

	public void setVendorApprovalStatus(String vendorApprovalStatus) {
		this.vendorApprovalStatus = vendorApprovalStatus;
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

	public Product getService() {
		return service;
	}

	public void setService(Product service) {
		this.service = service;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}


	
}
