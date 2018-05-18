package com.dapp.controller;

import com.dapp.entity.IMusic;
import com.dapp.entity.Music;
import com.dapp.service.IMusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by liuwenxue on 17/05/2018.
 */
@RestController
@RequestMapping("/api/playlist")
public class PlayListController {

    private IMusicService musicService;

    @Autowired
    public PlayListController(IMusicService musicService) {
        this.musicService = musicService;
    }

    @RequestMapping(value = "/{userid}", method = RequestMethod.GET)
    public List<Music> getListByUserId(@PathVariable String userId, @RequestParam(value="provider", defaultValue = "netease", required = false) String provider) {
        return musicService.getMusicsByUserId(provider, userId);

    }
}
