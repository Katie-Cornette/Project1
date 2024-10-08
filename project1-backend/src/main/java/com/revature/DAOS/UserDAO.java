package com.revature.DAOS;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository <User, Integer> {

    boolean existsByUsername(String username);

}
