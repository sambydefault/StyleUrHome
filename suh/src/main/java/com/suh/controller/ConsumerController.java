package com.suh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.suh.model.Design;
import com.suh.model.Project;
import com.suh.model.RoomDetails;
import com.suh.repository.DesignRepository;
import com.suh.repository.ProjectRepository;
import com.suh.repository.RoomDetailsRepository;
import com.suh.service.DesignService;
import com.suh.service.ProjectService;

@RestController
public class ConsumerController {

	@Autowired
	private DesignRepository designRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private RoomDetailsRepository roomDetailsRepository;

	private DesignService designService = new DesignService();
	private ProjectService projectService = new ProjectService();

	@RequestMapping(value = "/getAllRoomDesigns", method = RequestMethod.GET)
	public List<Design> getAllRoomDesigns() {
		return designService.getAllRoomDesigns(designRepository);
	}

//	@RequestMapping(value = "/saveProjectData", method = RequestMethod.POST)
//	public Project saveProjectData(@RequestParam("builtArea") String builtArea,
//			@RequestParam("projectName") String projectName, @RequestParam("userEmail") String userEmail,
//			@RequestParam("houseType") String houseType, Project project, RoomDetails roomDetails) {
//		projectService.saveProjectdata(builtArea, projectName, userEmail, houseType, projectRepository);
//		return null;
//	}

	@RequestMapping(value = "/saveRoomDetails", method = RequestMethod.POST)
	public List<RoomDetails> saveRoomDetails(@RequestBody Object[] roomDetails, List<RoomDetails> listRoomDetails) {
		projectService.saveRoomDetails(roomDetails, projectRepository, roomDetailsRepository, listRoomDetails);
		return projectService.fetchRoomsForPoject(roomDetailsRepository, listRoomDetails);
	}
	
	@RequestMapping(value = "/updateRoomDetails", method = RequestMethod.POST)
	public List<RoomDetails> updateRoomDetails(@RequestBody List<RoomDetails> listRooms, List<RoomDetails> listRoomDetails) {
		projectService.updateRoomDetails(listRooms, projectRepository, roomDetailsRepository);
		return projectService.fetchRoomsForPoject(roomDetailsRepository, listRoomDetails);
	}

//	@RequestMapping(value = "/fetchRoomsForPoject", method = RequestMethod.GET)
//	public List<RoomDetails> fetchRoomsForPoject(@RequestParam("projectID") int projectID, List<RoomDetails> listRoomDetails) {
//		return projectService.fetchRoomsForPoject(projectID, roomDetailsRepository, listRoomDetails);
//	}

}
