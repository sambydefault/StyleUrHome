package com.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boot.model.Template;
import com.boot.model.Vendor;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
	
	@Query(value = "SELECT * FROM template order by agreement_modified_date desc limit 1", nativeQuery = true)
	public Template getRecentTemplate();

}
