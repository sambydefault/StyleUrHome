package com.suh.model;

import java.util.List;

public class RequestWrapper {

	private List<RoomDetails> listRoomDetails;
	private List<Project> listProject;
	
	public List<RoomDetails> getListRoomDetails() {
		return listRoomDetails;
	}
	public void setListRoomDetails(List<RoomDetails> listRoomDetails) {
		this.listRoomDetails = listRoomDetails;
	}
	public List<Project> getListProject() {
		return listProject;
	}
	public void setListProject(List<Project> listProject) {
		this.listProject = listProject;
	}

}
