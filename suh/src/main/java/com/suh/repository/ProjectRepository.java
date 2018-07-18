package com.suh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.suh.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{
	
	//public List<Project> getProjectDetails(@Param("userID") String userID);

}
