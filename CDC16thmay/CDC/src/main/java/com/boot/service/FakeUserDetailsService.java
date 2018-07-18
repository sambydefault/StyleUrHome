//package com.boot.service;
//
//import java.util.Collection;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.boot.model.User;
//import com.boot.repository.UserRepository;
//
//@Service
//public class FakeUserDetailsService implements UserDetailsService {
//	@Autowired
//	private UserRepository userRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = (User) userRepository.findByFirstNameLike(username);
//		if (user == null) {
//			throw new UsernameNotFoundException("Username " + username + " not found");
//		}
//		return new org.springframework.security.core.userdetails.User(username, "password", getGrantedAuthorities(username));
//	}
//
////	private Collection<? extends GrantedAuthority> getGrantedAuthorities(String username) {
////		Collection<? extends GrantedAuthority> authorities;
////		if (username.equals("John")) {
////			authorities = List(() -> "ROLE_ADMIN", () -> "ROLE_BASIC");
////		} else {
////			authorities = List(() -> "ROLE_BASIC");
////		}
////		return authorities;
////	}
//}
