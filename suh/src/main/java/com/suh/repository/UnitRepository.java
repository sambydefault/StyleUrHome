package com.suh.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.suh.model.DesignUnits;
import com.suh.model.Unit;
import com.suh.model.UnitDetails;

public interface UnitRepository extends JpaRepository<Unit, Long> {

	@Query(value = "SELECT * FROM units un where un.id in :unitIDs ", nativeQuery = true)
	public List<Unit> findByUnitIDs(@Param("unitIDs") List<Long> unitIDs);
}
