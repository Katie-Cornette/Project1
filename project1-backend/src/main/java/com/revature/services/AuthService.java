package com.revature.services;

import com.revature.DAOS.AuthDAO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private AuthDAO aDAO;

    @Autowired
    public AuthService(AuthDAO aDAO){
        this.aDAO = aDAO;
    }

    public OutgoingUserDTO login(LoginDTO lDTO, HttpSession session){

        User u = aDAO.findByUsernameAndPassword(lDTO.getUsername(), lDTO.getPassword());
        if(u==null){
            throw new IllegalArgumentException("Invalid Credentials! Check if username and password are correct.");
        }else{
            OutgoingUserDTO outUser = new OutgoingUserDTO(u.getUserId(), u.getFirstName(), u.getLastName(), u.getUsername(), u.getRole());
            session.setAttribute("userId", u.getUserId());
            session.setAttribute("firstname", u.getFirstName());
            session.setAttribute("lastname", u.getLastName());
            session.setAttribute("username", u.getUsername());
            session.setAttribute("role", u.getRole());

            return outUser;
        }

    }

}
