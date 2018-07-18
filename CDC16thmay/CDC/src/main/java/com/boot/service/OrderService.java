package com.boot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.model.OrderStatus;
//import com.boot.model.ConsumerServicePrice;
import com.boot.model.ServiceOrder;
import com.boot.model.User;
import com.boot.model.Vendor;
//import com.boot.model.VendorAcceptedOrder;
import com.boot.model.VendorOrderAction;
import com.boot.repository.OrderStatusRepository;
//import com.boot.repository.ConsumerServicePriceRepository;
import com.boot.repository.ProductRepository;
import com.boot.repository.ServiceOrderRepository;
import com.boot.repository.ServiceRepository;
import com.boot.repository.UserRepository;
import com.boot.repository.VendorOrderActionRepository;
import com.boot.repository.VendorRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

@Service
public class OrderService {

	@Autowired
	private ServiceOrderRepository serviceOrderRepository;

	@Autowired
	private VendorOrderActionRepository vendorOrderActionRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OrderStatusRepository orderStatusRepository;

	public List<ServiceOrder> getVendorQuotesSubmitted(String userEmail, Vendor vendor,
			List<ServiceOrder> listServiceOrder, VendorRepository vendorRepository,
			ServiceRepository serviceRepository) {
		// TODO Auto-generated method stub
		listServiceOrder = serviceOrderRepository.findOrderSubmittedByOSubmitter(userEmail);
		return listServiceOrder;
	}

	public List<ServiceOrder> getVendorQuotes(String userEmail, Vendor vendor, List<ServiceOrder> listServiceOrder,
			VendorRepository vendorRepository, ServiceRepository serviceRepository,
			ServiceOrderRepository serviceOrderRepository) {
		// listServiceOrder =
		// serviceOrderRepo.findVendorOrdersByEmail(userEmail);

		List<Vendor> listVendor = vendorRepository.getVendorInfoByVendorEmail(userEmail);
		List<String> listCategories = new ArrayList<String>();
		for (Vendor oVendor : listVendor) {
			listCategories.add(oVendor.getVendorService());
		}

		List<ServiceOrder> listSO = serviceOrderRepository.findAll();
		List<ServiceOrder> listMappedSO = new ArrayList<ServiceOrder>();

		for (ServiceOrder oServiceOrder : listSO) {
			for (String productCategory : listCategories) {
				if (oServiceOrder.getService().getProductSubCategory().equalsIgnoreCase(productCategory)) {
					listMappedSO.add(oServiceOrder);
				}
			}
		}

		return listMappedSO;

		/*
		 * List<Long> listService = new ArrayList<Long>(); List<Long>
		 * listVendorsCondition = new ArrayList<Long>(); for (int i = 0; i <
		 * listVendor.size(); i++) {
		 * listService.add(listVendor.get(i).getProduct().getProductid());
		 * //listVendorsCondition.add(listVendor.get(i).getVendorId()); }
		 * listServiceOrder =
		 * serviceOrderRepository.findByProductIdAndVendor(listService);
		 * 
		 * return listServiceOrder;
		 */
	}

	public void saveOrder(String userName, String serviceName, String servicingDate, User user, String additionalInfo,
			String comment, String timeslot, String serviceLocation) {
		user = userRepository.findByUserName(userName);
		ServiceOrder serviceOrder = formServiceOrderObj(user, serviceName, servicingDate, additionalInfo, comment,
				timeslot, serviceLocation);
		serviceOrderRepository.save(serviceOrder);

		// notifyVendors(serviceOrder);
	}

	public ServiceOrder formServiceOrderObj(User user, String serviceName, String servicingDate, String additionalInfo,
			String comment, String timeslot, String serviceLocation) {
		ServiceOrder serviceOrder = new ServiceOrder();
		// OrderStatus orderStatus =
		// orderStatusRepository.getOne(Long.valueOf(1));
		serviceOrder.setUser(user);
		serviceOrder.setService(productRepository.getProductInfoByCategory(serviceName));
		serviceOrder.setServiceRequestedDate(convertStringToSQLDate(servicingDate));
		serviceOrder.setServiceLocation(serviceLocation);
		serviceOrder.setOrderStatus("In Progress");
		serviceOrder.setAdditionalComment(comment);
		serviceOrder.setTimeSlot(timeslot);
		serviceOrder.setServiceInfo(additionalInfo);
		return serviceOrder;
	}

	public static Date convertStringToSQLDate(String dateStr) {
		Date sqlDate = null;
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		try {
			java.util.Date date = sdf.parse(dateStr);
			sqlDate = new Date(date.getTime());
			System.out.println(sqlDate.toString());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return sqlDate;
	}

	public void saveVendorApproval(String userEmail, long orderMasterId, long productid,
			VendorRepository vendorRepository, Vendor vendor, ServiceRepository serviceRepository) {
		// TODO Auto-generated method stub
		VendorOrderAction vendorAcceptedOrder = new VendorOrderAction();

		List<Vendor> objVendor = vendorRepository.findAllByVendorEmail(userEmail);
		vendorAcceptedOrder.setVendor(objVendor.get(0));
		ServiceOrder serviceOrder = serviceOrderRepository.findOne(orderMasterId);
		serviceOrder.setOrderStatus("Vendor Accepted");
		serviceOrderRepository.save(serviceOrder);
		vendorAcceptedOrder.setVendorApprovalStatus("Approved");

		boolean loadApproval = true;
		List<VendorOrderAction> listVendorOrderAction = new ArrayList<VendorOrderAction>();
		for (VendorOrderAction vendorOrderAction : serviceOrder.getVendorOrderAction()) {
			if (userEmail.equalsIgnoreCase(vendorOrderAction.getVendor().getVendorEmail())) {
				loadApproval = false;
			}
			listVendorOrderAction.add(vendorOrderAction);
		}

		if (loadApproval) {
			listVendorOrderAction.add(vendorAcceptedOrder);
			serviceOrder.setVendorOrderAction(listVendorOrderAction);
			vendorOrderActionRepository.save(vendorAcceptedOrder);
		}
		// return vendorAcceptedOrder;
	}

	public List<ServiceOrder> getOrderVendorApprovals(long orderMasterId, Vendor vendor,
			List<VendorOrderAction> listVendorOrderAction, VendorRepository vendorRepository,
			ServiceRepository serviceRepository) {
		// TODO Auto-generated method stub
		List<ServiceOrder> serviceOrdeDetails = serviceOrderRepository.findOrderById(orderMasterId);
		return serviceOrdeDetails;
	}

	public List<ServiceOrder> chooseVendor(long orderId, long productId, String vendorEmail, long orderMasterId,
			Vendor vendor, List<VendorOrderAction> listVendorOrderAction, VendorRepository vendorRepository,
			ServiceRepository serviceRepository) {
		VendorOrderAction vendorAcceptedOrder = new VendorOrderAction();
		List<Vendor> vendor1 = vendorRepository.getVendorByEmailAndID(vendorEmail, productId);

		vendorAcceptedOrder.setVendor(vendor1.get(0));
		ServiceOrder serviceOrder = serviceOrderRepository.findOne(orderMasterId);
		vendorAcceptedOrder.setVendorApprovalStatus("Approved");
		vendorAcceptedOrder.setUserStatus("Approved");

		boolean loadChooseStatus = true;
		listVendorOrderAction = new ArrayList<VendorOrderAction>();
		for (VendorOrderAction vendorOrderAction : serviceOrder.getVendorOrderAction()) {

			System.out.println("oVendorOrderAction.getOrderId() :::::::::::" + vendorOrderAction.getOrderId());
			if (vendorOrderAction.getUserStatus() != null) {
				loadChooseStatus = false;
			}
			if (vendorOrderAction.getVendor().getVendorId() == vendor1.get(0).getVendorId()) {
				orderId = vendorOrderAction.getOrderId();
				listVendorOrderAction.remove(vendorOrderAction);

			} else
				listVendorOrderAction.add(vendorOrderAction);
		}

		if (loadChooseStatus) {

			listVendorOrderAction.add(vendorAcceptedOrder);
			serviceOrder.setVendorOrderAction(listVendorOrderAction);

			vendorOrderActionRepository.save(vendorAcceptedOrder);
			vendorOrderActionRepository.delete(orderId);
		}

		List<ServiceOrder> serviceOrdeDetails = serviceOrderRepository.findOrderById(orderMasterId);
		return serviceOrdeDetails;
	}

	public List<ServiceOrder> submitServiceOrder(long orderMasterId, String userName, String serviceName,
			String servicingDate, User user) {

		ServiceOrder serviceOrder = serviceOrderRepository.findOne(orderMasterId);
		serviceOrder.setOrderStatus("User Accepted");
		serviceOrderRepository.save(serviceOrder);

		List<ServiceOrder> serviceOrdeDetails = serviceOrderRepository.findOrderById(orderMasterId);
		return serviceOrdeDetails;
	}

}
