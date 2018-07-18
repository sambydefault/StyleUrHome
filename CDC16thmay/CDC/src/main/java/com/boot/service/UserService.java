package com.boot.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.boot.model.Product;
import com.boot.model.User;
import com.boot.model.Vendor;
import com.boot.repository.ProductRepository;
import com.boot.repository.UserRepository;
import com.boot.repository.VendorRepository;

@Service
public class UserService {

	public ArrayList<User> saveUser(String userEmail, String userName, String userPassword, String vendorLocation,
			String serviceType, String proser, User user, UserRepository userRepository,
			VendorRepository vendorRepository, ProductRepository productRepository, MongoTemplate mongoTemplate) {
		ArrayList<User> listUser = new ArrayList<User>();
		user.setUserEmail(userEmail);
		user.setUserName(userName);
		user.setUserPassword(userPassword);
		user.setUserStatus("pending");
		System.out.println("vendorLocation" + vendorLocation + "::");
		if (!(vendorLocation != null && vendorLocation.isEmpty())) {
			user.setUserType("vendor");
			List<String> vendorServiceList = Arrays.asList(proser.split(","));
			for (int i = 0; i < vendorServiceList.size(); i++) {
				Vendor vendor = new Vendor();
				vendor.setVendorType(serviceType.toUpperCase());
				vendor.setVendorService(vendorServiceList.get(i).toUpperCase());
				vendor.setVendorLocation(vendorLocation);
				vendor.setVendorEmail(userEmail);
				vendor.setVendorStatus("ACTIVE");
				vendor.setAgreementStatus("");
				vendor.setVendorRating(2);
				/*
				 * List<Product> listProduct =
				 * productRepository.getProductForVendor(serviceType.toUpperCase
				 * (), vendorServiceList.get(i).toUpperCase()); if
				 * (listProduct.size() > 1) { for (int j = 0; j <
				 * listProduct.size(); j++) { Vendor objVendor = new Vendor();
				 * objVendor.setVendorType(serviceType.toUpperCase());
				 * objVendor.setVendorService(vendorServiceList.get(j).
				 * toUpperCase()); objVendor.setVendorLocation(vendorLocation);
				 * objVendor.setVendorEmail(userEmail);
				 * objVendor.setVendorStatus("ACTIVE");
				 * objVendor.setAgreementStatus("");
				 * objVendor.setVendorRating(2);
				 * //objVendor.setProduct(listProduct.get(j));
				 * vendorRepository.save(objVendor);
				 * //mongoTemplate.save(objVendor); } } else {
				 */
				// vendor.setProduct(listProduct.get(0));
				vendorRepository.save(vendor);
				// mongoTemplate.save(vendor);
				// }
			}

		} else
			user.setUserType("consumer");
		listUser.add(userRepository.save(user));
		// mongoTemplate.save(user);

		return listUser;
	}

	public User getProfile(String userEmail, User user, UserRepository userRepository) {
		return userRepository.findByUserEmail(userEmail);
	}

	public User udpateProfile(String userEmail, String userName, String phoneNumber, String addressOne,
			String addressTwo, String city, String state, String country, String zipcode, User objUser,
			UserRepository userRepository) {

		User user = userRepository.findByUserEmail(userEmail);

		user.setUserName(userName);
		user.setUserPhonenumber(phoneNumber);
		user.setUserAddressOne(addressOne);
		user.setUserAddressTwo(addressTwo);
		user.setUserCity(city);
		user.setUserState(state);
		user.setUserCountry(country);
		user.setZipCode(zipcode);
		return userRepository.save(user);
	}

	public User userExists(String userEmail, String userPassword, UserRepository userRepository) {
		return userRepository.findByUserEmail(userEmail);
	}

}
