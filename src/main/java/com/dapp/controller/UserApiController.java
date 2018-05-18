package com.dapp.controller;

import com.dapp.entity.impl.User;
import com.dapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by liuwenxue on 17/05/2018.
 */
@RestController
@RequestMapping("/api")
public class UserApiController {

    private UserService userService;

    @Autowired
    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> findAll() {
        return userService.findAll();
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.GET)
    public ResponseEntity<User> get(@NonNull @PathVariable String userId) {
        HttpStatus status = HttpStatus.OK;
        if (!userService.exists(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = userService.get(userId);
        return new ResponseEntity<>(user, status);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@NonNull @RequestBody User user) {
        HttpStatus status = HttpStatus.OK;
        if (userService.exists(user)) {
            status = HttpStatus.CREATED;
        }
        User newUser = userService.save(user);
        return new ResponseEntity<>(newUser, status);
    }

    @RequestMapping(value = "/users/{userId}", method = RequestMethod.DELETE)
    public void updateUser(@NonNull @PathVariable String userId) {
        this.userService.delete(userId);
    }

    @RequestMapping(value = "/users/{userId}/{walletAddress}", method = RequestMethod.PUT)
    public User updateUser(@NonNull @PathVariable String walletAddress, @NonNull @PathVariable String userId) {
        User user = this.userService.get(userId);
        user.setWalletAddress(walletAddress);
        return userService.save(user);
    }
}
