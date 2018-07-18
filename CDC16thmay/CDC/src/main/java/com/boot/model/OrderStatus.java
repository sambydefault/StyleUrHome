package com.boot.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class OrderStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long statusId;

	private String statusName;

	@OneToMany(cascade = CascadeType.ALL)
	private List<ServiceOrder> orderList;

	public List<ServiceOrder> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<ServiceOrder> orderList) {
		this.orderList = orderList;
	}

	public long getStatusId() {
		return statusId;
	}

	public void setStatusId(long statusId) {
		this.statusId = statusId;
	}

	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

}
