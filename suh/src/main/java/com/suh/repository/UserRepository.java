package com.suh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.suh.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query(value = "SELECT * FROM User ur where ur.user_email =:userEmail ", nativeQuery = true)
	public User findByuserEmail(@Param("userEmail") String userEmail);

}
