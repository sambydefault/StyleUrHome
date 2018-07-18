package com.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
/*import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
*/import org.springframework.stereotype.Repository;

import com.boot.model.OrderStatus;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
	
	//soumya added
	/*@Query(value = "SELECT * FROM user u where u.user_name = :userName", nativeQuery = true)
	public OrderStatus findByUserName(@Param("userName") String userName);
*/

}
