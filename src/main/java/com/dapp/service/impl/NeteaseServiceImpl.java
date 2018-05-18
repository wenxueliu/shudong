package com.dapp.service.impl;

import com.dapp.entity.Music;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuwenxue on 17/05/2018.
 */
@Service
public class NeteaseServiceImpl { //implements IMusicService {

    //@Override
    public Music getMusicById(String provider, String musicId) {
        return null;
    }

    //@Override
    public List<Music> getMusicsByUserId(String provider, String userId) {
        List<Music> musics = new ArrayList<>(3);
        Music m1 = new Music("123", "hello", "jack", 10);
        Music m2 = new Music("124", "hello2", "jack", 10);
        Music m3 = new Music("125", "hello3", "jack", 10);
        musics.add(m1);
        musics.add(m2);
        musics.add(m3);
        return musics;
    }

    //@Override
    public List<Music> searchMusics(String provider, String kewWord) {
        List<Music> musics = new ArrayList<>(3);
        Music m1 = new Music("123", "hello", "jack", 10);
        musics.add(m1);
        return musics;
    }

}
