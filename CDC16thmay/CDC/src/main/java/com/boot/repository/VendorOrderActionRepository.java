package com.boot.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.boot.model.ServiceOrder;
import com.boot.model.VendorOrderAction;

public interface VendorOrderActionRepository extends JpaRepository<VendorOrderAction, Long> {

	@Query(value = "SELECT * FROM VENDOR_ORDER_ACTION  vo where vo.user_userid = 2", nativeQuery = true)
	ArrayList<VendorOrderAction> findByUserEmail(@Param("userEmail") String userEmail);

	@Query(value = "SELECT * FROM VENDOR_ORDER_ACTION  vo where vo.service_order_list_order_master_id = :orderMasterId", nativeQuery = true)
	List<VendorOrderAction>  findByOrderId(@Param("orderMasterId") long orderMasterId);

	
	@Query(value = "SELECT * FROM VENDOR_ORDER_ACTION  vo where vo.service_order_list_order_master_id = :orderMasterId and vo.choose_status='Approved'", nativeQuery = true)
	List<VendorOrderAction> findStatusByMasterId(@Param("orderMasterId") long orderMasterId);
}

