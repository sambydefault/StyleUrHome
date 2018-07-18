package com.boot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.model.ConsumerPrice;
import com.boot.model.UserPayment;
import com.boot.repository.PaymentRepository;
import com.boot.service.PaymentService;
import com.boot.service.UserService;

@RestController
public class PaymentController {
	@Autowired
	private PaymentRepository paymentRepository;
	
	PaymentService paymentService = new PaymentService();
	
	
	/*@Autowired
	private UserPayment userPayment; */
	
	
	@RequestMapping(value = "/getPayPalAmount", method = RequestMethod.GET)
	private List<UserPayment> getPayPalAmount(@RequestParam("userEmail") String userEmail) {
		System.out.println("getPayPalAmount");
		return paymentRepository.getPayPalAmount(userEmail);
	}
	
	@RequestMapping(value = "/placePaytmOrder", method = RequestMethod.POST)
	public UserPayment placePaytmOrder(@RequestParam("availableAmount") long availableAmount,@RequestParam("itemPrice") long itemPrice,@RequestParam("userEmail") String userEmail) {
		
		long balanceamount = availableAmount - itemPrice;
		System.out.println("balanceamount ::::::::::" +balanceamount);
		return paymentService.placePaytmOrder(balanceamount,itemPrice, userEmail,paymentRepository);
	}
}
