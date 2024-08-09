package com.revature.controllers;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
public class AuthController {

    private AuthService as;

    public AuthController(AuthService as){
        this.as = as;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginDTO lDTO, HttpSession session){
        try{
            OutgoingUserDTO outUser = as.login(lDTO, session);
            return ResponseEntity.accepted().body(outUser);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
