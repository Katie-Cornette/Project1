package com.revature.services;

import com.revature.DAOS.ReimbursementDAO;
import com.revature.DAOS.UserDAO;
import com.revature.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO rDAO;
    private UserDAO uDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, UserDAO uDAO){
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }

    public Reimbursement addReimbursement(Reimbursement newReimbursement){
        if(newReimbursement.getDescription() == null || newReimbursement.getDescription().equals("")){
            throw new IllegalArgumentException("Please provide a description");
        }
        if(newReimbursement.getAmount() <= 0){
            throw new IllegalArgumentException("Please enter a positive amount");
        }
        Reimbursement r = rDAO.save(newReimbursement);
        return r;
    }

    public List<Reimbursement> getReimbursementByUserId(int userId){
        if(!uDAO.existsById(userId)) {
            throw new IllegalArgumentException("User does not exist");
        }
        return rDAO.findByUserUserId(userId);
    }

    public List<Reimbursement> getReimbursementsByStatusAndUserId(String status, int userId){
        if(!uDAO.existsById(userId)){
            throw new IllegalArgumentException("User does not exist");
        }
        List<Reimbursement> reimbursements = rDAO.findByStatusAndUserUserId(status, userId);
        if(reimbursements.isEmpty()){
            throw new IllegalArgumentException("You have no " + status + " reimbursements.");
        }
        return reimbursements;
    }

    public void deleteReimbursementById(int id){

        if(rDAO.findById(id).isPresent()){
            Reimbursement re = rDAO.findById(id).get();
            re.getUser().getReimbursements().remove(re);
            rDAO.deleteById(id);
        } else{
            throw new IllegalArgumentException("Reimbursement with" + id + "does not exist");
        }

    }

    public Reimbursement updateReimbursementDescription(String newDescription, int id){
        if(newDescription == null || newDescription.equals("")){
            throw new IllegalArgumentException("Please provide a description for the reimbursement");
        }
        Optional<Reimbursement> existingReimbursement = rDAO.findById(id);
        if(existingReimbursement.isPresent()){
            Reimbursement updatedRe = existingReimbursement.get();
            updatedRe.setDescription(newDescription);
            return rDAO.save(updatedRe);
        }
        else{
            throw new IllegalArgumentException("Reimbursement with " + id + " does not exist");
        }
    }

    public List<Reimbursement> getAllReimbursement(){
        return rDAO.findAll();
    }

    public List<Reimbursement> getReimbursementsByStatus(String status){
        List<Reimbursement> reimbursements = rDAO.findByStatus(status);
        return reimbursements;
    }

    public Reimbursement updatePendingReimbursementStatus(String newStatus, int reId){
        Reimbursement updatedRe1;
        if(newStatus == null || newStatus.isEmpty()){
            throw new IllegalArgumentException("Please provide new status");
        }
        Optional<Reimbursement> existingReimbursement = rDAO.findById(reId);
        if(existingReimbursement.isPresent()){
            Reimbursement updatedRe = existingReimbursement.get();
            if(updatedRe.getStatus().equals("pending")) {
                updatedRe.setStatus(newStatus);
                updatedRe1 = rDAO.save(updatedRe);
            }
            else{
                throw new IllegalArgumentException("Reimbursement has already been resolved");
            }
            return updatedRe1;
        }
        else{
            throw new IllegalArgumentException("Reimbursement with " + reId + " does not exist");
        }
    }



}
