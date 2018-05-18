package com.dapp.service;

import com.dapp.entity.impl.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by liuwenxue on 17/05/2018.
 */

@Repository
public class UserService {

    private final Map<String, User>  userMap = new ConcurrentHashMap<>();

    public User get(String userId) {
        User user = userMap.get(userId);
        return user;
    }

    public User get(User user) {
        user = userMap.get(user.getId());
        return user;
    }

    public Boolean exists(User user) {
        User u = userMap.get(user.getId());
        return u != null;
    }

    public Boolean exists(String userId) {
        User user = userMap.get(userId);
        return user != null;
    }

    public User save(User user) {
        userMap.put(user.getId(), user);
        return user;
    }

    public List<User> findAll() {
        return new ArrayList<>(userMap.values());
    }

    public void delete(String userId) {
        userMap.remove(userId);
    }
}
