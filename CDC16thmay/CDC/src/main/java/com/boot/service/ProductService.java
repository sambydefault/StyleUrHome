package com.boot.service;

import java.awt.image.BufferedImage;
import java.awt.image.ColorConvertOp;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.boot.model.Product;
import com.boot.model.ProductReview;
import com.boot.repository.ProductRepository;
import com.boot.repository.ProductReviewRepository;
import com.boot.repository.ServiceRepository;

@Service
@Qualifier("productservice")
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductReviewRepository productReviewRepository;

	Properties properties = new Properties();
	ClassLoader classloader = Thread.currentThread().getContextClassLoader();
	InputStream resource = classloader.getResourceAsStream("application-constants.properties");

	public ProductService() {
		try {
			properties.load(resource);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Map<String, Integer> avgRatingMap;
	private List<String> productIdList;

	public List<Product> productAnalyzer(String category, String subcategory) {
		productIdList = new ArrayList<String>();
		System.out.println("In ProductService for category :" + category + " subcategory " + subcategory);
		List<Product> productList = fetchAllProductsBasedOnCriteria(category, subcategory);
		populateProductIdList(productList);
		List<ProductReview> productReviewList = fetchProductsReviewsProductSpecific(productIdList);
		findAvgProductRating(productReviewList);
		prepareProductEntityWithUpdatedRating(productList);
		persistProductEntity(productList);
		return productList;

	}

	private void populateProductIdList(List<Product> productList) {
		for (Product p : productList) {
			productIdList.add(String.valueOf(p.getProductid()));
		}
	}

	private void prepareProductEntityWithUpdatedRating(List<Product> productList) {
		// TODO Auto-generated method stub
		for (Product p : productList) {
			String pid = String.valueOf(p.getProductid());
			if (avgRatingMap.containsKey(pid)) {
				p.setAvgrating(avgRatingMap.get(pid));
			}
		}
	}

	private void findAvgProductRating(List<ProductReview> productReviewList) {
		// TODO Auto-generated method stub
		avgRatingMap = new HashMap<String, Integer>();
		for (ProductReview reviews : productReviewList) {
			String productid = String.valueOf(reviews.getProduct().getProductid());
			if (avgRatingMap != null) {
				if (!avgRatingMap.containsKey(productid)) {
					avgRatingMap.put(productid, reviews.getRating());
				} else if (avgRatingMap.containsKey(productid)) {
					avgRatingMap.put(productid, (reviews.getRating() + avgRatingMap.get(productid)) / 2);

				}
			}
		}
	}

	public List<Product> loadProductInformation(String productName, String productDescription, String brandName,
			String productCategory, String productItemCategory, String productSubCategory, int productSoldQty,
			MultipartFile productImage, int productMinPrice, int productMaxPrice, int productPrice,
			String productInStock, int productAvailableQty, String productVersion, String imageFilePath,
			ServiceRepository serviceRepository) {
		Product oProduct = new Product();
		File inputFile = null;
		FileInputStream fis = null;
		File outpuFile = null;
		try {
			inputFile = new File(productImage.getOriginalFilename());
			System.out.println("inputFile" + inputFile);
			String contentType = productImage.getContentType();
			fis = new FileInputStream(inputFile);
			outpuFile = new File(imageFilePath + "\\" + inputFile.getName());
			BufferedImage bufferedInputImage = new BufferedImage(963, 640, BufferedImage.TYPE_3BYTE_BGR);
			bufferedInputImage = ImageIO.read(fis);
			BufferedImage rgbImage = new BufferedImage(bufferedInputImage.getWidth(), bufferedInputImage.getHeight(),
					BufferedImage.SCALE_SMOOTH);
			ColorConvertOp op = new ColorConvertOp(null);
			op.filter(bufferedInputImage, rgbImage);

			ImageIO.write(rgbImage, contentType.substring(6), outpuFile);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}

		oProduct.setAvgrating(0);
		oProduct.setProductName(productName);
		oProduct.setProductDescription(productDescription);
		oProduct.setProductBrand(brandName);
		oProduct.setProductCategory(productCategory);
		oProduct.setProductItemCategory(productItemCategory);
		oProduct.setProductSubCategory(productSubCategory);
		oProduct.setProductSoldQty(productSoldQty);
		oProduct.setProductImage(inputFile.getName());
		oProduct.setProductMinPrice(productMinPrice);
		oProduct.setProductMaxPrice(productMaxPrice);
		oProduct.setProductPrice(productPrice);
		oProduct.setProductStock(productInStock);
		oProduct.setProductAvailableQty(productAvailableQty);
		oProduct.setProductVersion(productVersion);
		serviceRepository.save(oProduct);

		return serviceRepository.findAll();
	}

	public List<ProductReview> fetchAllReviews() {
		System.out.println("Fetching all products reviews");
		return productReviewRepository.findAllReviews();
	}

	public List<Product> fetchAllProductsBasedOnCriteria(String category, String subcategory) {
		// TODO Auto-generated method stub
		List<Product> productList = productRepository.getProductsIgnoreCase(category, subcategory);
		return productList;
	}

	public void persistProductEntity(List<Product> productList) {
		// TODO Auto-generated method stub
		for (Product p : productList) {
			productRepository.save(p);
		}
	}

	public List<Product> fetchAllProducts() {
		// TODO Auto-generated method stub
		return null;
	}

	public List<ProductReview> fetchProductsReviewsProductSpecific(List<String> productidlist) {
		// TODO Auto-generated method stub
		System.out.println("Fetching all products reviews");
		return productReviewRepository.getProductsReviewsProductSpecific(productidlist);
	}

	//soumya code
	public void updateProduct(String productId, String productName, String productSubCat, String productQnty,
			String productPrice) {
		productRepository
				.saveAndFlush(formProductObj(Long.parseLong(productId), productName, productSubCat, productQnty, productPrice));
	}

	private Product formProductObj(Long id, String productDesc, String productSubCat, String productQnty,
			String productPrice) {
		Product product = productRepository.getOne(id);
		product.setProductItemCategory(productSubCat);
		product.setProductPrice(Long.parseLong(productPrice));
		product.setProductDescription(productDesc);
		return product;

	}
	//ends

}
