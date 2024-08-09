package com.revature.services;

import com.revature.DAOS.ReimbursementDAO;
import com.revature.DAOS.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserDAO userDAO;
    private ReimbursementDAO rDAO;

    @Autowired
    public UserService(UserDAO userDAO, ReimbursementDAO rDAO){
        this.userDAO = userDAO;
        this.rDAO = rDAO;
    }

    public User registerUser(User newUser){
        if (newUser.getFirstName() == null || newUser.getFirstName().equals("")){
            throw new IllegalArgumentException("First Name must not be empty!");
        }
        if (newUser.getLastName() == null || newUser.getLastName().equals("")){
            throw new IllegalArgumentException("Last Name must not be empty!");
        }
        if (newUser.getUsername() == null || newUser.getUsername().length() <= 6){
            throw new IllegalArgumentException("Username needs to have at least 7 characters");
        }
        if (newUser.getPassword()== null || newUser.getPassword().length() <= 7) {
            throw new IllegalArgumentException("Password needs to have at least 8 characters");
        }
        if(userDAO.existsByUsername(newUser.getUsername())){
            throw new IllegalArgumentException("Username is taken");
        }

        User u = userDAO.save(newUser);
        return u;
    }

    public boolean doesUsernameExist(String username){
        return userDAO.existsByUsername(username);
    }

    public List<User> getAllUsers(){
        if(userDAO.findAll().isEmpty()){
            throw new IllegalArgumentException("There are no users");
        }
        return userDAO.findAll();

    }

    public void deleteUserById(int userId){

        if(userDAO.findById(userId).isPresent()){
            User u = userDAO.findById(userId).get();
            userDAO.delete(u);
            rDAO.deleteAll(rDAO.findByUserUserId(userId));
        } else{
            throw new IllegalArgumentException("User with id " +userId + " does not exist");
        }

    }

    public User updateUserRoleById(String newRole, int userId){
        User updatedUser;
        if(newRole == null|| newRole.equals("")){
            throw new IllegalArgumentException("Please provide a new Role");
        }
        if(userDAO.findById(userId).isPresent()){
            User u = userDAO.findById(userId).get();
            if(u.getRole().equals("manager")){
                throw new IllegalArgumentException("User is already a manager");
            }
            else{
                u.setRole("manager");
                updatedUser = userDAO.save(u);
            }
            return updatedUser;
        }
        else{
            throw new IllegalArgumentException("User with id " + userId + " does not exist");
        }
    }
}
