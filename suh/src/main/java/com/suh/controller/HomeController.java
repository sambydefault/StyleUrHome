package com.suh.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.suh.model.User;
import com.suh.repository.UserRepository;
import com.suh.service.UserService;

@RestController
public class HomeController {
	
	UserService userService = new UserService();
	@Autowired
	private UserRepository userRepository;


	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public User signup(@RequestParam("signupEmail") String signupEmail, @RequestParam("userName") String userName,
			@RequestParam("signupPassword") String signupPassword, @RequestParam("userType") String userType, User user) {
		if( userService.userExists(signupEmail, signupPassword, userRepository) == null)
				return userService.saveUser(signupEmail, userName, signupPassword, userType, user, userRepository);
		else
			return null;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public User login(@RequestParam(value = "userEmail", required = false) String userEmail,
			@RequestParam(value = "userPassword", required = false) String userPassword) {
		return userService.userExists(userEmail, userPassword, userRepository);

	}
}
