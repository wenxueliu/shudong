package com.dapp.entity.impl;

import javax.swing.*;
import java.util.Set;

/**
 * Created by liuwenxue on 17/05/2018.
 */
public class User {

    private String id;
    private String email;
    private String walletAddress;
    private String phoneNum;
    private String name;
    private Set<String> musics;

    public User() {
    }

    public User(String id, String email, String walletAddress) {
        this.id = id;
        this.email = email;
        this.walletAddress = walletAddress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getMusics() {
        return musics;
    }

    public void setMusics(Set<String> musics) {
        this.musics = musics;
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }

        User other = (User)obj;
        if (! (other instanceof User)) {
            return false;
        }

        return this.id.equals(other.id);
    }
}
