package com.suh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.suh.model.Unit;
import com.suh.repository.DesignRepository;
import com.suh.repository.DesignUnitsRepository;
import com.suh.repository.UnitRepository;
import com.suh.service.DesignService;

@RestController
public class DesignController {
	DesignService designService = new DesignService();
	
	@Autowired
	DesignRepository designRepository;
	
	@Autowired
	DesignUnitsRepository designUnitsRepository;
	
	@Autowired
	UnitRepository unitRepository;
	
	
	@RequestMapping(value = "/getDesignByID", method = RequestMethod.GET)
	public List<Unit> getDesignByID(@RequestParam("designID") int designID) {
		return designService.getUnitsByDesignID(designID, unitRepository, designRepository, designUnitsRepository);
	}

}
