package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")

public class UserController {

    private UserService us;

    @Autowired
    public UserController(UserService us){
        this.us = us;
    }

    @PostMapping
    public ResponseEntity<Object> registerUser(@RequestBody User newUser){


        try {
            if(newUser.getRole() == null){
                newUser.setRole("employee");
            }
            User u = us.registerUser(newUser);
            return ResponseEntity.status(201).body(u);
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllUsers(HttpSession session){
        String role = (String) session.getAttribute("role");
        try{
            if(role!=null && role.equals("manager")) {
                return ResponseEntity.ok(us.getAllUsers());
            }else{
                return ResponseEntity.status(401).body("You do not have authorization to perform this action.");
            }
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteUserById(@PathVariable int userId, HttpSession session){
        String role = (String) session.getAttribute("role");
        try{
            if(role!= null && role.equals("manager")){
                us.deleteUserById(userId);
                return ResponseEntity.status(200).body("User with id " + userId + " has been deleted");
            }else{
                return ResponseEntity.status(401).body("You do not have authorization to perform this action.");
            }

        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }

    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Object> updateUserRole(@RequestBody String newRole, @PathVariable int userId, HttpSession session){
        String role = (String) session.getAttribute("role");
        try{
            if(role!=null && role.equals("manager")){
                return ResponseEntity.status(200).body(us.updateUserRoleById(newRole, userId));
            }else{
                return ResponseEntity.status(401).body("You do not have authorization to perform this action.");
            }

        } catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<Object> doesUserNameExist(@PathVariable String username){
        String state = "";
        try{
            if(us.doesUsernameExist(username)){
                state += "Username: " + username + " already exists";
            }
            else{
                 state = "Username: " + username + " does not exist";
            }
            return ResponseEntity.status(200).body(state);
        }catch (IllegalArgumentException e ){
            return  ResponseEntity.status(400).body("Username does not exist");
        }
    }



}
