package com.bus.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bus.entity.User;
import com.bus.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {


    @Autowired
    private UserRepository userRepository;


    // SIGNUP API
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()) {
            return "Email already exists";
        }

        userRepository.save(user);

        return "Registration Successful";
    }



    // LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()) {

            User dbUser = existingUser.get();

            if(dbUser.getPassword().equals(user.getPassword())) {
                return "Login Successful";
            }
        }

        return "Invalid Email or Password";
    }

}