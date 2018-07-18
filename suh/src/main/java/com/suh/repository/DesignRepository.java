package com.suh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.suh.model.Design;

public interface DesignRepository extends JpaRepository<Design, Long> {

	// public List<Design> listDesigns(@Param("description") String
	// description);

}
