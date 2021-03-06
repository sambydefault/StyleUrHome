package com.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boot.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query(value = "SELECT * FROM product pr where pr.product_category = :productCategory and pr.proDUCT_SUB_CATEGORY like :productSubCategory", nativeQuery = true)
	public List<Product> getProductsIgnoreCase(@Param("productCategory") String productCategory,
			@Param("productSubCategory") String productSubCategory);

	@Query(value = "SELECT * FROM product pr where pr.productid = :productid", nativeQuery = true)
	public Product getProductInfoByID(@Param("productid") String productid);

	@Query(value = "SELECT * FROM product p where p.prODUCT_CATEGORY = :productCategory and p.prodUCT_SUB_CATEGORY  = :productSubCategory", nativeQuery = true)
	public List<Product> getProductForVendor(@Param("productCategory") String productCategory,
			@Param("productSubCategory") String productSubCategory);

	@Query(value = "SELECT * FROM product pr order by pr.product_category,  pr.product_sub_category, pr.product_item_category", nativeQuery = true)
	public List<Product> findAllByGroup();

	@Query(value = "SELECT * FROM product pr where LCASE(pr.product_category) like LCASE(CONCAT('%', :partialSearchText, '%')) or LCASE(pr.product_sub_category) like LCASE(CONCAT('%', :partialSearchText, '%')) or LCASE(pr.product_item_category) like LCASE(CONCAT('%', :partialSearchText, '%')) order by pr.product_category,  pr.product_sub_category, pr.product_item_category", nativeQuery = true)
	public List<Product> findAllByPartialSearch(@Param("partialSearchText") String partialSearchText);

	//soumya added
	@Query(value = "SELECT * FROM product pr where pr.product_sub_category = :category", nativeQuery = true)
	public Product getProductInfoByCategory(@Param("category") String category);

}
