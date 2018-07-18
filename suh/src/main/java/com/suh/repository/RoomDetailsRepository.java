package com.suh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.suh.model.RoomDetails;

public interface RoomDetailsRepository extends JpaRepository<RoomDetails, Long> {

	@Query(value = "SELECT * FROM room_details rd where rd.id= :projectID ", nativeQuery = true)
	public List<RoomDetails> findRoomsByProjectID(@Param("projectID") int projectID);

}
