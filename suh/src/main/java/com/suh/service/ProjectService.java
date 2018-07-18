package com.suh.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import com.suh.model.Project;
import com.suh.model.RoomDetails;
import com.suh.repository.ProjectRepository;
import com.suh.repository.RoomDetailsRepository;

@Service
public class ProjectService {
	Project objProject = new Project();

//	public void saveProjectdata(String builtArea, String projectName, String userEmail, String houseType,
//			ProjectRepository projectRepository) {
//		objProject = new Project();
//		objProject.setBuiltArea(Long.parseLong(builtArea));
//		objProject.setProjectName(projectName);
//		objProject.setUserID(userEmail);
//		objProject.setHouseType(houseType);
//		objProject.setStatus("DESIGN");
//		// projectRepository.save(objProject);
//	}

	public List<RoomDetails> saveRoomDetails(Object[] objectRoomDetails, ProjectRepository projectRepository,
			RoomDetailsRepository roomDetailsRepository, List<RoomDetails> listRoomDetails) {
		//objProject = projectRepository.save(objProject);
		objProject = new Project();
		listRoomDetails = new ArrayList<RoomDetails>();
		for (int i = 0; i < objectRoomDetails.length; i++) {
			@SuppressWarnings("unchecked")
			ArrayList<String> list = (ArrayList<String>) objectRoomDetails[i];
			org.json.JSONArray jsonArray = new org.json.JSONArray(list);
			if (i == 0) {
				org.json.JSONObject projectObject = (org.json.JSONObject) jsonArray.get(i);
				objProject.setBuiltArea(projectObject.getLong("builtArea"));
				objProject.setProjectName(projectObject.getString("projectName")); 
				objProject.setUserID(projectObject.getString("userEmail"));
				objProject.setHouseType(projectObject.getString("houseType"));
				objProject.setStatus("DESIGN");
				objProject = projectRepository.save(objProject);
			} else {
				for (int j = 0; j < jsonArray.length(); j++) {
					org.json.JSONObject jsonObject = (org.json.JSONObject) jsonArray.get(j);

					if (!(jsonObject.equals(null))) {
						RoomDetails roomDetails = new RoomDetails();
						roomDetails.setLength(Long.parseLong(jsonObject.get("length").toString()));
						roomDetails.setBreadth(Long.parseLong(jsonObject.get("breadth").toString()));
						roomDetails.setHeight(Long.parseLong(jsonObject.get("height").toString()));
						roomDetails.setRoomType(jsonObject.get("roomType").toString());
						roomDetails.setProject(objProject);
						listRoomDetails.add(roomDetails);
					}
				}
			}
			System.out.println(listRoomDetails);
		}
		// objProject.setListRoomDetails(listRoomDetails);
		System.out.println(objProject);
		return roomDetailsRepository.save(listRoomDetails);
	}
	
	public List<RoomDetails> updateRoomDetails(List<RoomDetails> listRooms, ProjectRepository projectRepository, RoomDetailsRepository roomDetailsRepository) {
		for (RoomDetails roomDetails : listRooms) {
			RoomDetails objRoomDetails = new RoomDetails();
			objRoomDetails.setRoomImage(roomDetails.getRoomImage());
		}
		return null;
	}

	public Project getObjProject() {
		return objProject;
	}

	public void setObjProject(Project objProject) {
		this.objProject = objProject;
	}

	public List<RoomDetails> fetchRoomsForPoject(RoomDetailsRepository roomDetailsRepository,
			List<RoomDetails> listRoomDetails) {
		return roomDetailsRepository.findRoomsByProjectID(objProject.getId());
	}

	// private ArrayList<UnitDetails> arrUnitDetails = new ArrayList<>();
	// private ArrayList<RoomDetails> arrRoomDetails = new ArrayList<>();
	// private UnitDAOImpl objUnitDAOImpl = new UnitDAOImpl();
	// private ProjectDAOImpl objProjectDAOImpl = new ProjectDAOImpl();
	//
	// SimpleDateFormat sdformat = new SimpleDateFormat("MM-dd-YYYY");
	//
	// public ArrayList<UnitDetails> prepareUnitDetail(
	// org.json.JSONArray jsonArray, int designID, Project objProject,
	// RoomDetails objRoomDetails) {
	//
	// for (int i = 0; i < jsonArray.size(); i++) {
	// UnitDetails objUnitDetails = new UnitDetails();
	// JSONObject jsonObject = (JSONObject) jsonArray.get(i);
	// objUnitDetails.setType(jsonObject.get("TYPE").toString());
	// objUnitDetails.setColor(jsonObject.get("COLOR").toString());
	// objUnitDetails.setUnit(jsonObject.get("UNIT").toString());
	// objUnitDetails.setLength((double) (jsonObject.getDouble("LENGTH")));
	// objUnitDetails.setBreadth((double) jsonObject.getDouble("BREADTH"));
	// objUnitDetails.setHeight((double) jsonObject.getDouble("HEIGHT"));
	// objUnitDetails.setDesignID(designID);
	// objUnitDetails.setImg("Image1");
	// objUnitDetails.setUnitDetails(objProject);
	// objUnitDetails.setRoomDetails(objRoomDetails);
	// //objProject.getUnitDetails().add(objUnitDetails);
	// arrUnitDetails.add(objUnitDetails);
	// }
	// // objUnitDAOImpl.saveUnitDetails(arrUnitDetails);
	// return arrUnitDetails;
	// }
	//
	// public RoomDetails prepareRoomDetail(String roomType,
	// String roomDimension, String roomImage, int designID, Project objProject)
	// {
	//
	// RoomDetails objRoomDetails = new RoomDetails();
	// objRoomDetails.setDesignID(designID);
	// objRoomDetails.setRoomDimension(roomDimension);
	// objRoomDetails.setRoomType(roomType);
	// objRoomDetails.setRoomDetails(objProject);
	// objRoomDetails.setRoomImg(roomImage);
	// //objProject.getRoomDetails().add(objRoomDetails);
	// //arrRoomDetails.add(objRoomDetails);
	// return objRoomDetails;
	// }
	//
	// public void saveProjectDetails(net.sf.json.JSONArray jsonArray,
	// String houseType, String roomType, String roomDimension, String
	// roomImage,
	// int designID, String status, String projectName, String userID) {
	// ProjectDAOImpl projectDAOImpl = new ProjectDAOImpl();
	// ProjectService projectService = new ProjectService();
	// RoomDetails objRoomDetails = new RoomDetails();
	// Project objProject = new Project();
	// objProject.setHouseType(houseType);
	// objProject.setStatus(status);
	// objProject.setProjectName(projectName);
	// objProject.setUserID(userID);
	// objProject.setDateCreated(sdformat.format(new Date()));
	// // projectDAOImpl.saveProject(objProject);
	//
	//
	// objRoomDetails = projectService.prepareRoomDetail(roomType,
	// roomDimension, roomImage, designID, objProject);
	//
	// arrUnitDetails = projectService.prepareUnitDetail(jsonArray, designID,
	// objProject, objRoomDetails);
	//
	// projectDAOImpl.saveProject(objProject, arrUnitDetails, objRoomDetails);
	// // projectDAOImpl.saveRoomDetails(roomDetails);
	// }
	//
	// public void updateProjectDetails(net.sf.json.JSONArray jsonArray,
	// String roomType, String roomDimension, String roomImage,
	// int designID, String status, int projectID, String userID) {
	// ProjectDAOImpl projectDAOImpl = new ProjectDAOImpl();
	// ProjectService projectService = new ProjectService();
	// RoomDetails objRoomDetails = new RoomDetails();
	// Project objProject = new Project();
	// objProject.setId(projectID);
	// // projectDAOImpl.saveProject(objProject);
	//
	//
	// objRoomDetails = projectService.prepareRoomDetail(roomType,
	// roomDimension, roomImage, designID, objProject);
	//
	// arrUnitDetails = projectService.prepareUnitDetail(jsonArray, designID,
	// objProject,objRoomDetails);
	//
	// projectDAOImpl.updateProject(projectID, arrUnitDetails, objRoomDetails);
	// // projectDAOImpl.saveRoomDetails(roomDetails);
	// }
	//
	// public void updateProject(int projectID, String status) {
	// objProjectDAOImpl.updateProject(projectID, status);
	// }
	//
	// @SuppressWarnings("unchecked")
	// public List<Project> getProjectDetails(String userID) {
	// ProjectDAOImpl objProjectDOImpl = new ProjectDAOImpl();
	// List<Project> arrProjectList;
	// arrProjectList = objProjectDOImpl.getProjectDetails(userID);
	//
	// Project objProject = new Project();
	// objProject.setUnitDetails(null);
	// objProject.setRoomDetails(null);
	//
	// return arrProjectList;
	// }
	//
	// @SuppressWarnings("unchecked")
	// public List<Project> getProjectDetails() {
	// ProjectDAOImpl objProjectDOImpl = new ProjectDAOImpl();
	// List<Project> arrProjectList;
	// arrProjectList = objProjectDOImpl.getProjectDetails();
	//
	// //Project objProject = new Project();
	// //objProject.setUnitDetails(null);
	// //objProject.setRoomDetails(null);
	//
	// return arrProjectList;
	// }
}
