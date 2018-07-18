package com.boot.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boot.model.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

	@Query(value = "SELECT * FROM vendor ve where ve.vendor_email = :vendorEmail", nativeQuery = true)
	public List<Vendor> getVendorInfoByVendorEmail(@Param("vendorEmail") String vendorEmail);

	@Query(value = "SELECT * FROM vendor ven where  ven.vendor_Service =:catselected and ven.vendor_email =:vendor and ven.vendor_Type='SERVICES' and ven.vendor_Status='ACTIVE'", nativeQuery = true)
	public List<Vendor> findLocationByCatagories(@Param("catselected") String categorySelected,
			@Param("vendor") String vendor);

	@Query(value = "SELECT * FROM vendor ven where LCASE(ven.vendor_Service) like LCASE(CONCAT('%', :catselected, '%')) and ven.vendor_Type='SERVICES' and ven.vendor_Status='ACTIVE'", nativeQuery = true)
	public List<Vendor> findVendorByCatagoriesAndLocation(@Param("catselected") String catselected);

	@Query(value = "SELECT * FROM vendor ven where ven.vendor_Status='ACTIVE'", nativeQuery = true)
	public Set<Vendor> findNewVendorByStatus();

	public Vendor findByVendorEmail(String vendorEmail);

	@Query(value = "SELECT * FROM vendor ven where ven.vendor_email = :vendorEmail  and ven.vendor_Status='ACTIVE'", nativeQuery = true)
	public List<Vendor> findAllByVendorEmail(@Param("vendorEmail") String vendorEmail);
	
	@Query(value = "SELECT * FROM vendor ve where ve.vendor_email = :userEmail and ve.product_productid = :productid", nativeQuery = true)
	public List<Vendor> getVendorByEmailAndID(@Param("userEmail") String userEmail, @Param("productid") long productid);


}
