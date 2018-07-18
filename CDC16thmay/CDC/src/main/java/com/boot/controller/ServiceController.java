package com.boot.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

import com.boot.model.Product;
import com.boot.model.Vendor;
import com.boot.repository.ServiceRepository;
import com.boot.repository.VendorRepository;
import com.boot.service.ProductService;

@RestController
public class ServiceController implements ServletContextAware {

	@Autowired
	private ServiceRepository serviceRepository;
	@Autowired
	private VendorRepository vendorRepository;

	@Autowired
	ServletContext servletContext;

	ProductService productService = new ProductService();

	@RequestMapping(value = "/productLoad", method = RequestMethod.POST)
	private List<Product> productLoad(@RequestParam("productName") String productName,
			@RequestParam("productDescription") String productDescription, @RequestParam("brandName") String brandName,
			@RequestParam("productCategory") String productCategory,
			@RequestParam("productItemCategory") String productItemCategory,
			@RequestParam("productSubCategory") String productSubCategory,
			@RequestParam("productSoldQty") int productSoldQty,
			@RequestParam("productImage") MultipartFile productImage,
			@RequestParam("productMinPrice") int productMinPrice, @RequestParam("productMaxPrice") int productMaxPrice,
			@RequestParam("productPrice") int productPrice, @RequestParam("productInStock") String productInStock,
			@RequestParam("productAvailableQty") int productAvailableQty,
			@RequestParam("productVersion") String productVersion) {

		String imageFilePath = servletContext.getRealPath("//images");
		return productService.loadProductInformation(productName, productDescription, brandName, productCategory,
				productItemCategory, productSubCategory, productSoldQty, productImage, productMinPrice, productMaxPrice,
				productPrice, productInStock, productAvailableQty, productVersion, imageFilePath, serviceRepository);

	}

	@RequestMapping(value = "/getProductDateSortList", method = RequestMethod.GET)
	private java.util.List<Product> getProductDateSortList() {
		System.out.println("Testing the product List sorted !!!!");

		List<Product> oProduct = serviceRepository.findAllDateSortByGroup();
		System.out.println(oProduct.size());

		return oProduct;
	}

	@RequestMapping(value = "/createServiceOrders", method = RequestMethod.GET)
	private java.util.List<Product> createServiceOrders() {
		System.out.println("createServiceOrders-getLoggedinUser!!!!!");
		ArrayList ar = new ArrayList();
		ar = serviceRepository.findAllCatagories();
		System.out.println(ar.size());
		return ar;
	}

	@RequestMapping(value = "/selectVendor", method = RequestMethod.GET)
	private java.util.List<Vendor> selectVendor(@RequestParam("catselected") String catselected) {
		System.out.println("selectVendor-getLoggedinUser !!!");
		System.out.println("selectVendor-getLoggedinUser - categorySelected" + catselected);
		List<Vendor> ar = new ArrayList();
		ar = vendorRepository.findVendorByCatagoriesAndLocation(catselected);
		System.out.println(ar.size());
		return ar;
	}

	@RequestMapping(value = "/selectServiceLocations", method = RequestMethod.GET)
	private java.util.List<Vendor> selectServiceLocations(@RequestParam("catselected") String catselected,
			@RequestParam("vendor") String vendor) {
		System.out.println("selectServiceLocations-getLoggedinUser!!!!");
		System.out.println("selectServiceLocations-getLoggedinUser - categorySelected" + catselected);
		System.out.println("selectServiceLocations-getLoggedinUser - vendor" + vendor);
		List<Vendor> ar = new ArrayList();
		ar = vendorRepository.findLocationByCatagories(catselected, vendor);
		System.out.println(ar.size());
		return ar;
	}

	@Override
	public void setServletContext(ServletContext servletContext) {

	}

}
