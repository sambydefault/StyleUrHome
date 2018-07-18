package com.suh.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.suh.model.Design;
import com.suh.model.DesignUnits;
import com.suh.model.Unit;
import com.suh.repository.DesignRepository;
import com.suh.repository.DesignUnitsRepository;
import com.suh.repository.UnitRepository;

@Service
public class DesignService {

	public List<Design> getAllRoomDesigns(DesignRepository designRepository) {
		return designRepository.findAll();
	}

	public List<Unit> getUnitsByDesignID(int designID, UnitRepository unitRepository,
			DesignRepository designRepository, DesignUnitsRepository designUnitsRepository) {
		// return unitRepository.findAllByID(designID);
		List<DesignUnits> listDesignType = designUnitsRepository.findDesignUnitXREF(designID);
		
		List<Long> listUnitIDs = new ArrayList<Long>();
		for (int i = 0; i < listDesignType.size(); i++) {
				listUnitIDs.add(listDesignType.get(i).getUnitsID());
		}
		
		return unitRepository.findByUnitIDs(listUnitIDs);
	}
}
