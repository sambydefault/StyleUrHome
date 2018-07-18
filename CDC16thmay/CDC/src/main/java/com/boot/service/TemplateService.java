package com.boot.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.boot.model.Template;
import com.boot.model.Vendor;
import com.boot.repository.TemplateRepository;
import com.boot.repository.VendorRepository;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

@Service
public class TemplateService {

	public Template saveAgreementTemplate(String vendorAgreementText, TemplateRepository templateRepository) {
		// TODO Auto-generated method stub
		TemplateService templateService = new TemplateService();
		templateService.createPDFTemplate(vendorAgreementText);
		Template template = new Template();
		template.setVendorAgreementText(vendorAgreementText);
		template.setVendorAgreeementVersion("1.0");
		template.setAgreementModifiedDate(new Date());
		return templateRepository.save(template);
	}

	public Template getAgreementTemplate(TemplateRepository templateRepository) {
		return templateRepository.getRecentTemplate();
	}

	public void createPDFTemplate(String vendorAgreementText) {
		Document document = new Document();
		try {
			BufferedWriter bfWriter = new BufferedWriter(new FileWriter(new File("c:\\Dumps\\Input.html")));
			bfWriter.write(vendorAgreementText);
			bfWriter.close();
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("c:\\Dumps\\Agreement.pdf"));
			document.open();
			XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream("c:\\Dumps\\Input.html"));
			document.add(new Paragraph(vendorAgreementText));
			document.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void sendAgreementToVendor(String vendorEmail, String vendorAgreementText,
			VendorRepository vendorRepository) {
		List<Vendor> listVendor = vendorRepository.findAllByVendorEmail(vendorEmail);
		for (Vendor objVendor : listVendor) {
			objVendor.setVendorAgreementText(vendorAgreementText);
			objVendor.setAgreementStatus("PENDING VENDOR");
			vendorRepository.save(objVendor);
		}
	}

	public Set<Vendor> getNewVendorList(String agreementStatus, TemplateRepository templateRepository,
			VendorRepository vendorRepository) {
		agreementStatus = "ACCEPTED";
		return vendorRepository.findNewVendorByStatus();
	}

	public Vendor getvendorAgreement(String vendorEmail, VendorRepository vendorRepository) {
		List<Vendor> listVendor = vendorRepository.findAllByVendorEmail(vendorEmail);
		return listVendor.get(0);
	}

	public void respondToAgreement(String vendorEmail, String acceptanceStatus, VendorRepository vendorRepository) {
		// TODO Auto-generated method stub
		List<Vendor> listVendor = vendorRepository.findAllByVendorEmail(vendorEmail);
		for (Vendor objVendor : listVendor) {
			objVendor.setAgreementStatus(acceptanceStatus);
			objVendor.setAgreementDate(new Date());
			vendorRepository.save(objVendor);
		}
	}

}
