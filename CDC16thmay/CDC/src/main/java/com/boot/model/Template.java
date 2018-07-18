package com.boot.model;

import java.sql.Clob;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Template {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long templateID;

	@Lob
	private String vendorAgreementText;
	private String vendorAgreeementVersion;
	private Date agreementModifiedDate;

	public long getTemplateID() {
		return templateID;
	}

	public void setTemplateID(long templateID) {
		this.templateID = templateID;
	}

	public String getVendorAgreeementVersion() {
		return vendorAgreeementVersion;
	}

	public void setVendorAgreeementVersion(String vendorAgreeementVersion) {
		this.vendorAgreeementVersion = vendorAgreeementVersion;
	}

	public Date getAgreementModifiedDate() {
		return agreementModifiedDate;
	}

	public void setAgreementModifiedDate(Date agreementModifiedDate) {
		this.agreementModifiedDate = agreementModifiedDate;
	}

	public String getVendorAgreementText() {
		return vendorAgreementText;
	}

	public void setVendorAgreementText(String vendorAgreementText) {
		this.vendorAgreementText = vendorAgreementText;
	}
}
