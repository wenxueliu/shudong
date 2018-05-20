package com.dapp.controller;

import com.dapp.entity.Music;
import com.dapp.service.IMusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by liuwenxue on 17/05/2018.
 */
@RestController
@RequestMapping("/api")
public class SearchApiController {

    private IMusicService musicService;

    @Autowired
    public SearchApiController(IMusicService musicService) {
        this.musicService = musicService;
    }

    //TODO
    @RequestMapping(value = "/search/{keyWord}", method = RequestMethod.GET)
    public List<Music> searchMusic(@NonNull @PathVariable String keyWord,
                                   @NonNull @RequestParam(value = "provider", defaultValue = "tencent", required = false) String provider,
                                   @RequestParam(value = "limit", defaultValue = "10", required = false) int limit) {

        return musicService.searchMusics(provider, keyWord, limit);

    }
}
