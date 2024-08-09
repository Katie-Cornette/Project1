package com.revature.DAOS;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    public List<Reimbursement> findByUserUserId(int userId);

    public List<Reimbursement> findByStatusAndUserUserId(String status, int userId);

    public List<Reimbursement> findByStatus(String status);

}
