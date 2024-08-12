package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Entity
@Table(name = "reimbursement")
@Component
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbld;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, columnDefinition = "varchar(255) default 'PENDING'")
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    public Reimbursement() {
    }

    public Reimbursement(int reimbld, String description, BigDecimal  amount, User user) {
        this.reimbld = reimbld;
        this.description = description;
        this.amount = amount;
        this.user = user;
    }

    public Reimbursement(int reimbld, String description, BigDecimal amount, String status, User user) {
        this.reimbld = reimbld;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbld() {
        return reimbld;
    }

    public void setReimbld(int reimbld) {
        this.reimbld = reimbld;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbld=" + reimbld +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
