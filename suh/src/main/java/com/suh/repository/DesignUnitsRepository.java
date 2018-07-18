package com.suh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.suh.model.DesignUnits;

public interface DesignUnitsRepository extends JpaRepository<DesignUnits, Long> {
	
	@Query(value = "SELECT * FROM design_units du where du.designid= :designID ", nativeQuery = true)
	public List<DesignUnits> findDesignUnitXREF(@Param("designID") int designID);


}
