package com.boot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.model.ConsumerServicePrice;
import com.boot.model.ServiceOrder;
import com.boot.model.User;
import com.boot.model.Vendor;
import com.boot.model.VendorOrderAction;
import com.boot.repository.ProductRepository;
import com.boot.repository.ServiceOrderRepository;
import com.boot.repository.ServiceRepository;
import com.boot.repository.VendorRepository;
import com.boot.service.OrderService;

@RestController
public class ServiceOrderController {

	@Autowired
	private OrderService orderServ;

	@Autowired
	private ServiceRepository serviceRepository;
	@Autowired
	private ServiceOrderRepository serviceOrderRepository;
	@Autowired
	private VendorRepository vendorRepository;
	@Autowired
	private ProductRepository productRepository;

	@RequestMapping(value = "/saveServiceOrder", method = RequestMethod.POST)
	public void saveServiceOrder(@RequestParam("userName") String userName,
			@RequestParam("serviceName") String serviceName, @RequestParam("servicingDate") String servicingDate,
			User user, ServiceOrder serviceOrder, @RequestParam("additionalInfo") String additionalInfo,
			@RequestParam("timeslot") String timeslot, @RequestParam("comment") String comment,
			@RequestParam("serviceLocation") String serviceLocation) {
		orderServ.saveOrder(userName, serviceName, servicingDate, user, additionalInfo, comment, timeslot,
				serviceLocation);
	}

	@RequestMapping(value = "/getVendorServiceQuotes", method = RequestMethod.GET)
	public List<ServiceOrder> getVendorServiceQuotes(@RequestParam("userEmail") String userEmail, Vendor vendor,
			List<ServiceOrder> listServiceOrder) {
		return orderServ.getVendorQuotes(userEmail, vendor, listServiceOrder, vendorRepository, serviceRepository,
				serviceOrderRepository);
	}

	@RequestMapping(value = "/getVendorServiceSubmitted", method = RequestMethod.GET)
	public List<ServiceOrder> getVendorServiceSubmitted(@RequestParam("userEmail") String userEmail, Vendor vendor,
			List<ServiceOrder> listServiceOrder) {
		return orderServ.getVendorQuotesSubmitted(userEmail, vendor, listServiceOrder, vendorRepository,
				serviceRepository);
	}

	@RequestMapping(value = "/getOrderVendorApprovals", method = RequestMethod.GET)
	public List<ServiceOrder> getOrderVendorApprovals(@RequestParam("orderMasterId") long orderMasterId, Vendor vendor,
			List<VendorOrderAction> listVendorOrderAction) {
		return orderServ.getOrderVendorApprovals(orderMasterId, vendor, listVendorOrderAction, vendorRepository,
				serviceRepository);
	}

	@RequestMapping(value = "/chooseVendor", method = RequestMethod.POST)
	public List<ServiceOrder> chooseVendor(@RequestParam("orderId") long orderId,
			@RequestParam("productId") long productId, @RequestParam("vendorEmail") String vendorEmail,
			@RequestParam("orderMasterId") long orderMasterId, Vendor vendor,
			List<VendorOrderAction> listVendorOrderAction) {
		return orderServ.chooseVendor(orderId, productId, vendorEmail, orderMasterId, vendor, listVendorOrderAction,
				vendorRepository, serviceRepository);
	}

	@RequestMapping(value = "/submitServiceOrder", method = RequestMethod.POST)
	public List<ServiceOrder> submitServiceOrder(@RequestParam("orderMasterId") long orderMasterId,
			@RequestParam("userName") String userName, @RequestParam("serviceName") String serviceName,
			@RequestParam("servicingDate") String servicingDate, User user, ServiceOrder serviceOrder) {
		return orderServ.submitServiceOrder(orderMasterId, userName, serviceName, servicingDate, user);
	}

	@RequestMapping(value = "/approveServiceOrderQuote", method = RequestMethod.POST)
	public void approveServiceOrderQuote(@RequestParam("orderMasterId") long orderMasterId,
			@RequestParam("productid") long productid, @RequestParam("userEmail") String userEmail, Vendor vendor) {
		orderServ.saveVendorApproval(userEmail, orderMasterId, productid, vendorRepository, vendor, serviceRepository);
	}
}
