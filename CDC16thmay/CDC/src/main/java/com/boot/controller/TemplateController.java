package com.boot.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.model.Template;
import com.boot.model.Vendor;
import com.boot.repository.TemplateRepository;
import com.boot.repository.VendorRepository;
import com.boot.service.TemplateService;

@RestController
public class TemplateController {

	@Autowired
	private TemplateRepository templateRepository;

	@Autowired
	private VendorRepository vendorRepository;

	TemplateService templateService = new TemplateService();

	@RequestMapping(value = "/getAgreementTemplate", method = RequestMethod.GET)
	private Template getAgreementTemplate() {
		return templateService.getAgreementTemplate(templateRepository);
	}

	@RequestMapping(value = "/saveAgreementTemplate", method = RequestMethod.POST)
	private Template saveAgreementTemplate(@RequestParam("vendorAgreementText") String vendorAgreementText) {
		return templateService.saveAgreementTemplate(vendorAgreementText, templateRepository);
	}

	@RequestMapping(value = "/createPDFTemplate", method = RequestMethod.POST)
	private void createPDFTemplate(@RequestParam("vendorAgreementText") String vendorAgreementText) {
		templateService.createPDFTemplate(vendorAgreementText);
	}

	@RequestMapping(value = "/getNewVendorList", method = RequestMethod.GET)
	private Set<Vendor> getNewVendorList(@RequestParam("agreementStatus") String agreementStatus) {
		return templateService.getNewVendorList(agreementStatus, templateRepository, vendorRepository);
	}

	@RequestMapping(value = "/sendAgreementToVendor", method = RequestMethod.POST)
	private void sendAgreementToVendor(@RequestParam("vendorEmail") String vendorEmail,
			@RequestParam("vendorAgreementText") String vendorAgreementText) {
		templateService.sendAgreementToVendor(vendorEmail, vendorAgreementText, vendorRepository);
	}

	@RequestMapping(value = "/getvendorAgreement", method = RequestMethod.GET)
	private Vendor getvendorAgreement(@RequestParam("vendorEmail") String vendorEmail) {
		return templateService.getvendorAgreement(vendorEmail, vendorRepository);
	}

	@RequestMapping(value = "/respondToAgreement", method = RequestMethod.POST)
	private void respondToAgreement(@RequestParam("vendorEmail") String vendorEmail,
			@RequestParam("acceptanceStatus") String acceptanceStatus) {
		templateService.respondToAgreement(vendorEmail, acceptanceStatus, vendorRepository);
	}

}
