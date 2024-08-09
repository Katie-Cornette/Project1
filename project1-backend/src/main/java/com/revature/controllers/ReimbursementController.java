package com.revature.controllers;

import com.revature.DAOS.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reimbursement")
@CrossOrigin(origins = "*")
public class ReimbursementController {

    private ReimbursementService rs;
    private UserDAO uDAO;

    @Autowired
    public ReimbursementController(ReimbursementService rs, UserDAO uDAO){
        this.rs = rs;
        this.uDAO = uDAO;
    }

    @PostMapping
    public ResponseEntity<Object> addReimbursement(@RequestBody IncomingReimbursementDTO newReimbursement){
        try {
            if(newReimbursement.getStatus() == null) {
                Reimbursement r = new Reimbursement(0, newReimbursement.getDescription(), newReimbursement.getAmount(), "pending", null);
                Optional<User> u = uDAO.findById(newReimbursement.getUserId());
                if (u.isPresent()) {
                    r.setUser(u.get());
                    Reimbursement returnedre = rs.addReimbursement(r);
                    return ResponseEntity.status(201).body(returnedre);
                } else {
                    return ResponseEntity.status(400).body("Couldn't find User with Id: " + newReimbursement.getUserId());
                }
            }
            else {
                Reimbursement r = new Reimbursement(0, newReimbursement.getDescription(), newReimbursement.getAmount(), newReimbursement.getStatus(), null);
                Optional<User> u = uDAO.findById(newReimbursement.getUserId());
                if (u.isPresent()) {
                    r.setUser(u.get());
                    Reimbursement returnedre = rs.addReimbursement(r);
                    return ResponseEntity.status(201).body(returnedre);
                } else {
                    return ResponseEntity.status(400).body("Couldn't find User with Id: " + newReimbursement.getUserId());
                }
            }

        } catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getReimbursementsByUserId(@PathVariable int userId){
        try {
            return ResponseEntity.ok(rs.getReimbursementByUserId(userId));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{status}/{userId}")
    public ResponseEntity<Object> getReimbursementsByStatus(@PathVariable String status, @PathVariable int userId){
        try{
            return ResponseEntity.ok(rs.getReimbursementsByStatusAndUserId(status, userId));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    @DeleteMapping("/{reimbursementId}")
    public ResponseEntity<Object> deleteReimbursementById(@PathVariable int reimbursementId){
        try{
            rs.deleteReimbursementById(reimbursementId);
            return ResponseEntity.status(200).body("Reimbursement with ID: " + reimbursementId + " was deleted");
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PatchMapping("/{reimbursementId}")
    public ResponseEntity<Object> updateReimbursementDescription(@RequestBody String newDescription, @PathVariable int reimbursementId){
        try{
            Reimbursement updatedre = rs.updateReimbursementDescription(newDescription, reimbursementId);
            return ResponseEntity.ok(updatedre);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllReimbursements(){
        return ResponseEntity.ok(rs.getAllReimbursement());

    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Object> getReimbursementsByStatus(@PathVariable String status){
        try{
            return ResponseEntity.ok(rs.getReimbursementsByStatus(status));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PatchMapping("/pending/{reId}")
    public ResponseEntity<Object> resolveReimbursement(@RequestBody String newStatus, @PathVariable int reId){
        try{
            return ResponseEntity.ok(rs.updatePendingReimbursementStatus(newStatus, reId));
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }





}
