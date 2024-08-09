package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
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
    public ResponseEntity<Object> getAllUsers(){
        try{
            return ResponseEntity.ok(us.getAllUsers());
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteUserById(@PathVariable int userId){
        try{
            us.deleteUserById(userId);
            return ResponseEntity.status(200).body("User with id " + userId + " has been deleted");
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }

    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Object> updateUserRole(@RequestBody String newRole, @PathVariable int userId){
        try{
            return ResponseEntity.status(200).body(us.updateUserRoleById(newRole, userId));
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
