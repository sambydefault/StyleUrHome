package com.suh.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.suh.model.User;
import com.suh.repository.UserRepository;

@Service
public class UserService {

	public User saveUser(String userEmail, String userName, String userPassword, String userType, User user,
			UserRepository userRepository) {
		ArrayList<User> listUser = new ArrayList<User>();
		user.setUserEmail(userEmail);
		user.setUserName(userName);
		user.setUserPassword(userPassword);
		user.setUserStatus("pending");
		user.setUserType("consumer");
		return userRepository.save(user);
		// mongoTemplate.save(user);

	}

	public User getProfile(String userEmail, User user, UserRepository userRepository) {
		return user;
	}
	
	public User userExists(String userEmail, String userPassword, UserRepository userRepository) {
		return userRepository.findByuserEmail(userEmail);
	}
}
