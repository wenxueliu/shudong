package com.dapp.service;


import com.dapp.entity.Music;

import java.util.List;

/**
 * Created by liuwenxue on 17/05/2018.
 */
public interface IMusicService {

    Music getMusicById(String provider, String musicId);
    List<Music> getMusicsByUserId(String provider, String userId);
    List<Music> searchMusics(String provider, String kewWord, int limit);
}
