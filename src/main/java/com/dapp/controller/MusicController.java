package com.dapp.controller;

import com.dapp.entity.Music;
import com.dapp.service.IMusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.List;

/**
 * Created by liuwenxue on 17/05/2018.
 */
@RestController
@RequestMapping("/api/musics")
public class MusicController {

    private IMusicService musicService;

    @Autowired
    public MusicController(IMusicService musicService) {
        this.musicService = musicService;
    }

    //@RequestMapping(value = "/musics", method = RequestMethod.GET)
    //public List<IMusic> getListByUserId(@NonNull @RequestParam(value="userId", required = true) String userId, @NonNull @RequestParam(value = "provider", defaultValue = "netease", required = false) String provider) {
    //    return musicService.getMusicsByUserId(provider, userId);
    //}

    @RequestMapping(value = "/{musicId}", method = RequestMethod.GET)
    public Music getMusicById(@NonNull @PathVariable String musicId, @NonNull @RequestParam(value = "provider", defaultValue = "tencent", required = false) String provider, HttpServletResponse response) {
    //public ResponseEntity<Music> getMusicById(@NonNull @PathVariable String musicId, @NonNull @RequestParam(value = "provider", defaultValue = "tencent", required = false) String provider, HttpServletResponse response) {
        return musicService.getMusicById(provider, musicId);
        /*
        final RestTemplate restTemplate = new RestTemplateBuilder().build();
        String newUrl = "https://39.107.238.130:443/api/musics/" + musicId + "?provider=netease";
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(newUrl));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
        */

    }
}
