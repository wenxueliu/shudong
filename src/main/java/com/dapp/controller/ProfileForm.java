package com.dapp.controller;

//import org.springframework.lang.NonNull;
//
//import javax.validation.constraints.NotEmpty;
//import java.time.LocalDate;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;

/**
 * Created by liuwenxue on 08/05/2018.
 */


import com.dapp.date.PastLocalDate;
import org.springframework.lang.NonNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ProfileForm {
    @NotEmpty
    private String twitterHandle;

    @Email
    @NotEmpty
    private String email;

    @NonNull
    @PastLocalDate
    private LocalDate birthDate;

    @NotEmpty
    private List<String> tastes = new ArrayList<>();
    // getters and setters

    public String getTwitterHandle() {
        return twitterHandle;
    }

    public void setTwitterHandle(String twitterHandle) {
        this.twitterHandle = twitterHandle;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public List<String> getTastes() {
        return tastes;
    }

    public void setTastes(List<String> tastes) {
        this.tastes = tastes;
    }

    @Override
    public String toString() {
        return "ProfileForm{" +
                "twitterHandle='" + twitterHandle + '\'' +
                ", email='" + email + '\'' +
                ", birthDate=" + birthDate +
                ", tastes=" + tastes +
                '}';
    }
}


/*
public class ProfileForm {
    @NotEmpty
    private String name;
    @NonNull
    private LocalDate birthDay;
    @NonNull
    private Map<String, String> tastes = new HashMap<>();

    String getName() {
        return name;
    }

    void setName(String name) {
        this.name = name;
    }

    LocalDate getBirthDay() {
        return birthDay;
    }

    void setBirthDay(LocalDate day) {
        birthDay = day;
    }

    Map<String, String> getTastes() {
        return tastes;
    }

    String getTastes(String key) {
        return tastes.get(key);
    }

}
*/
