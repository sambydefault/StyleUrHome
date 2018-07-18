package com.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.boot.model.UserPayment;

@Repository
public interface PaymentRepository extends JpaRepository<UserPayment, Long> {
	
	
	
	@Query(value = "SELECT * FROM user_payment up where up.user_email = :userEmail", nativeQuery=true)
	public List<UserPayment> getPayPalAmount(@Param("userEmail") String userEmail);

	/*@Query(value = "update user_payment set available_amount= :balanceAmount, last_transaction='12', date_created=sysdate, date_modified=sysdate where user_email = :userEmail", nativeQuery=true)
	public UserPayment placePaytmOrder(long balanceAmount, String userEmail);*/
	
	
}
