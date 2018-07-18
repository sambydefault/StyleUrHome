package com.boot.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boot.model.ConsumerPrice;
import com.boot.model.ServiceOrder;

@Repository
public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Long> {

	@Query(value = "SELECT * FROM consumer_service_price cp where cp.user_Email = :userEmail and cp.status = :status", nativeQuery = true)
	ArrayList<ServiceOrder> findByUserEmail(@Param("userEmail") String userEmail, @Param("status") String status);
	
	@Query(value = "SELECT *  FROM service_order so where so.order_master_id = :orderMasterId", nativeQuery = true)
	public ServiceOrder findVendorByOrderId(@Param("orderMasterId") long orderMasterId);
	
	@Query(value = "SELECT *  FROM service_order so where so.order_master_id = :orderMasterId", nativeQuery = true)
	public List<ServiceOrder> findOrderById(@Param("orderMasterId") long orderMasterId);

	/*@Query(value = "SELECT * FROM SERVICE_ORDER so where so.SERVICE_PRODUCTID in :productids and "
			+ "so.order_master_id not in (SELECT SERVICE_ORDER_LIST_ORDER_MASTER_ID  FROM VENDOR_ORDER_ACTION where vendor_vendor_id not in (select vendor_id from vendor where product_productid in :productids and vendor_id not in :vendorids))", nativeQuery = true)
	public List<ServiceOrder> findByProductIdAndVendor(@Param("productids") List<Long> productids, @Param("vendorids") List<Long> vendorids);*/
	
	@Query(value = "SELECT * FROM SERVICE_ORDER so where so.SERVICE_PRODUCTID in :productids", nativeQuery = true)
	public List<ServiceOrder> findByProductIdAndVendor(@Param("productids") List<Long> productids);

	@Query(value = "SELECT *  FROM service_order so where so.user_userid=(select userid from user where user_email = :userEmail)", nativeQuery = true)
	public List<ServiceOrder> findOrderSubmittedByOSubmitter(@Param("userEmail") String userEmail);

}
