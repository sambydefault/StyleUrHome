package com.boot.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.boot.model.UserPayment;
import com.boot.repository.PaymentRepository;

@Service
public class PaymentService {

	public UserPayment placePaytmOrder(long balanceamount, long itemPrice, String userEmail, PaymentRepository paymentRepository) {
		// TODO Auto-generated method stub
		
		List<UserPayment> listoUserPayment = paymentRepository.getPayPalAmount(userEmail);
		
		listoUserPayment.get(0).setAvailable_amount(balanceamount);
		listoUserPayment.get(0).setLast_transaction(itemPrice);
		listoUserPayment.get(0).setDateCreated(new Date());
		listoUserPayment.get(0).setDateModified(new Date());
		
		return paymentRepository.save(listoUserPayment.get(0));
		
	}

}
