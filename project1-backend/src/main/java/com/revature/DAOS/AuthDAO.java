package com.revature.DAOS;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDAO extends JpaRepository<User, Integer> {

    public User findByUsernameAndPassword(String username, String password);
}
