package com.boot.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.springframework.stereotype.Service;

import com.boot.model.ConsumerPrice;
import com.boot.model.Product;
import com.boot.model.User;
import com.boot.repository.ConsumerPriceRepository;
import com.boot.repository.ProductRepository;
import com.boot.repository.UserRepository;

@Service
public class ConsumerService {

	Properties properties = new Properties();
	ClassLoader classloader = Thread.currentThread().getContextClassLoader();
	InputStream resource = classloader.getResourceAsStream("application-constants.properties");

	public ConsumerService() {
		try {
			properties.load(resource);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public ArrayList<ConsumerPrice> saveConsumerPrice(String userName, String userEmail, String productID,
			String userPrice, int quantity, String dateRequired, ConsumerPrice consumerPrice,
			ConsumerPriceRepository consumerPriceRepository, ProductRepository productRepository, UserRepository userRepository) throws ParseException {
		ArrayList<ConsumerPrice> listConsumerPrice = new ArrayList<ConsumerPrice>();
		consumerPrice.setUserName(userName);
		consumerPrice.setUserEmail(userEmail);
		consumerPrice.setUserPrice(userPrice);
		User user = userRepository.findByUserEmail(userEmail);
		consumerPrice.setUser(user);
		consumerPrice.setProductQuantity(quantity);
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MMM/yyyy");														
		Date dateFormatted = dateFormat.parse(dateRequired.substring(8, 10) + "/" + dateRequired.substring(4,7) + "/" + dateRequired.substring(11,15) );

		consumerPrice.setDateRequired(dateFormatted	);
		consumerPrice.setStatus("cart");
		Product product = new Product();
		product = productRepository.getProductInfoByID(productID);
		consumerPrice.setProduct(product);
		listConsumerPrice.add(consumerPriceRepository.save(consumerPrice));
		return listConsumerPrice;
	}

	public List<ConsumerPrice> getPendingCart(String userEmail, ConsumerPrice consumerPrice,
			ConsumerPriceRepository consumerPriceRepository) {
		List<ConsumerPrice> list = consumerPriceRepository.findByUserEmail(userEmail, properties.get("STATUS_CART").toString());
		return list;
	}

	public void deleteCart(long consumerPriceID, ConsumerPriceRepository consumerPriceRepository) {
		consumerPriceRepository.deleteByConsumerPriceID(consumerPriceID);
	}

	public ArrayList<ConsumerPrice> placeQuote(List<ConsumerPrice> finalItems, ConsumerPrice consumerPrice,
			ConsumerPriceRepository consumerPriceRepository) {
		ArrayList<ConsumerPrice> listConsumerPrice = new ArrayList<ConsumerPrice>();

		System.out.println(finalItems);
		Iterator<ConsumerPrice> iterator = finalItems.iterator();
		String userEmail = null;
		while (iterator.hasNext()) {
			ConsumerPrice objConsumerPrice = (ConsumerPrice) iterator.next();
			objConsumerPrice.setStatus("quoted");
			userEmail = objConsumerPrice.getUserEmail();
			objConsumerPrice.setDateOfQuote(new Date());
			consumerPriceRepository.save(objConsumerPrice);
		}

		listConsumerPrice = consumerPriceRepository.findByUserEmail(userEmail,
				properties.get("STATUS_QUOTE").toString());
		return listConsumerPrice;
	}

	public List<ConsumerPrice> getUserQuotes(String userEmail, ConsumerPriceRepository consumerPriceRepository) {
		try {
			InputStream resource = classloader.getResourceAsStream("application-constants.properties");
			// in = new FileInputStream("application-constants.properties");
			properties.load(resource);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		List<String> listStatus = new ArrayList<String>();
		String status = properties.get("STATUS_QUOTE").toString();
		String statusSuggested = properties.get("STATUS_SUGGESTED").toString();
		listStatus.add(status);
		listStatus.add(statusSuggested);
		return consumerPriceRepository.getUserQuotesByuserEmail(userEmail, listStatus);
	}

	public List<ConsumerPrice> updateQuotes(List<ConsumerPrice> listConsumerPrice,
			ConsumerPriceRepository consumerPriceRepository) {
		for (ConsumerPrice consumerPrice : listConsumerPrice) {
			consumerPrice.setStatus(properties.get("STATUS_QUOTE").toString());
			consumerPriceRepository.save(consumerPrice);
		}
		return listConsumerPrice;
	}

	public void deleteQuote(long consumerPriceID, ConsumerPriceRepository consumerPriceRepository) {
		consumerPriceRepository.deleteByConsumerPriceID(consumerPriceID);
	}

	public List<ConsumerPrice> getOrderByUser(String userEmail, List<ConsumerPrice> listConsumerPrice,
			ConsumerPriceRepository consumerPriceRepository) {
		List<String> listStatus = new ArrayList<String>();
		String status = properties.get("STATUS_ORDER").toString();
		String statusSuggested = properties.get("STATUS_DISPATCH").toString();
		listStatus.add(status);
		listStatus.add(statusSuggested);
		return consumerPriceRepository.findOrdersByUserEmail(userEmail, listStatus);
	}

	public List<ConsumerPrice> getVendorAcceptedQuotes(String userEmail,
			ConsumerPriceRepository consumerPriceRepository) {
		String statusSuggested = properties.get("STATUS_ACCEPTED").toString();
		return consumerPriceRepository.getVendorAcceptedQuotesByuserEmail(userEmail, statusSuggested);
	}

	public ConsumerPrice placeOrder(long consumerPriceID, ConsumerPriceRepository consumerPriceRepository) {
		ConsumerPrice consumerPrice = consumerPriceRepository.findByConsumerPriceID(consumerPriceID);
		consumerPrice.setStatus(properties.get("STATUS_ORDER").toString());
		consumerPrice.setDateOfQuote(new Date());
		return consumerPriceRepository.save(consumerPrice);
	}
}
