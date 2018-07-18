package com.boot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Table(name="user_payment")
public class UserPayment {
	
		@Id
		private String user_email;
		private long available_amount;
		private long last_transaction;
		
		public String getUser_email() {
			return user_email;
		}
		public void setUser_email(String user_email) {
			this.user_email = user_email;
		}
		public long getAvailable_amount() {
			return available_amount;
		}
		public void setAvailable_amount(long available_amount) {
			this.available_amount = available_amount;
		}
		public long getLast_transaction() {
			return last_transaction;
		}
		public void setLast_transaction(long last_transaction) {
			this.last_transaction = last_transaction;
		}
		
		@UpdateTimestamp
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "date_created")
		private java.util.Date dateCreated ;
		
		@UpdateTimestamp
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "date_modified")
		private java.util.Date dateModified ;
		
	
		public java.util.Date getDateCreated() {
			return dateCreated;
		}
		public void setDateCreated(java.util.Date dateCreated) {
			this.dateCreated = dateCreated;
		}
		
		public java.util.Date getDateModified() {
			return dateModified;
		}
		public void setDateModified(java.util.Date dateModified) {
			this.dateModified = dateModified;
		}
		
	
}
