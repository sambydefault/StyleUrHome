package com.boot.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
/*import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
*/import org.springframework.stereotype.Repository;

import com.boot.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT * FROM user us where us.user_email = :userEmail", nativeQuery = true)
	public User findByUserEmail(@Param("userEmail") String userEmail);

	public User findByUserName(String userName);

}
