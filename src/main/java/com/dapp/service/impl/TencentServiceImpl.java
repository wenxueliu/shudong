package com.dapp.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dapp.entity.Music;
import com.dapp.service.IMusicService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by liuwenxue on 17/05/2018.
 */
@Service
public class TencentServiceImpl implements IMusicService {

    private static final Logger logger = LoggerFactory.getLogger(TencentServiceImpl.class);

    public Music getMusicPicture(String provider, String musicId) {
        return null;
    }

    private Music convertToMusic(String body) {
        JSONObject jsonObj = JSONObject.parseObject(body);
        JSONArray array = jsonObj.getJSONArray("data");
        if (array.isEmpty()) {
            return null;
        }
        JSONObject data = array.getJSONObject(0);

        String name = data.getString("name");
        String id = data.getString("id");
        String title = data.getString("title");
        int duration = data.getInteger("interval");

        JSONArray singers = data.getJSONArray("singer");
        String singerName = "UnKnow";
        if (!singers.isEmpty()) {
            JSONObject singer = singers.getJSONObject(0);
            singerName = singer.getString("name");
        }

        JSONObject album = data.getJSONObject("album");
        String albumMid = album.getString("mid");
        String albumName = album.getString("name");

        String pictureId = albumMid;

        String songMid = data.getString("mid");

        JSONObject file = data.getJSONObject("file");
        String mediaMid = file.getString("media_mid");

        Music music  = new Music(id, title, singerName, duration)
                .setPictureURL(pictureIdToURL(albumMid));
        music.setMediaMid(mediaMid);
        music.setSongMid(songMid);
        music.setPictureId(pictureId);
        music.setAlbumName(albumName);
        music.setPictureURL(pictureIdToURL(pictureId));
        String streamURL = getStreamURL(songMid, mediaMid);
        music.setStreamURL(streamURL);

        return music;
    }

    @Override
    public Music getMusicById(String provider, String musicId) {
        System.out.println("musicId " + musicId);
        //String musicId = "213870537";
        String url = String.format("https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songid=%s&platform=yqq&format=json", musicId);

        Connection.Response response = null;
        try {
            response = Jsoup.connect(url)
            .userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
            .header("Accept", "*/*")
            .header("Cache-Control", "no-cache")
            .header("Connection", "keep-alive")
            .header("Refener", "https://y.qq.com/portal/player.html")
            .header("Accept-Language", "zh-CN,en-US;q=0.7,en;q=0.3")
            .header("Pragma", "no-cache")
            .header("Cookie", "pgv_pvi=22038528; pgv_si=s3156287488; pgv_pvid=5535248600; yplayer_open=1; ts_last=y.qq.com/portal/player.html; ts_uid=48     47550686; yq_index=0; qqmusic_fromtag=66; player_exist=1")
            .method(Connection.Method.GET)
            .ignoreContentType(true)
            .timeout(10000)
            .execute();
            if (response == null) {
                throw new IOException("read response error");
            }
            String body = response.body();
            System.out.println("body" + body);
            if (body !=  null) {
                return convertToMusic(body);
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        return null;
    }



    @Override
    public List<Music> getMusicsByUserId(String provider, String userId) {
        return null;
    }

    private String pictureIdToURL(String pictureId) {
        String pictureURL = new StringBuilder(50).
                append("https://y.gtimg.cn/music/photo_new/T002R300x300M000").
                append(pictureId).append(".jpg?max_age=2592000")
                .toString();
        return pictureURL;
    }

    private List<Music> convertToMusics(String body, int limit) {
        JSONObject jsonObj = JSONObject.parseObject(body);
        JSONObject data = jsonObj.getJSONObject("data");
        JSONObject song = data.getJSONObject("song");
        JSONArray songList = song.getJSONArray("list");
        Iterator<Object> iter = songList.iterator();
        int count = 0;
        List<Music> musics = new ArrayList<>(50);
        while(iter.hasNext()) {
            count++;
            if (count > limit) {
               break;
            }
            Object obj = iter.next();
            JSONObject musicInfo = JSONObject.parseObject(obj.toString());
            String songid = musicInfo.getString("songid");
            String title = musicInfo.getString("songname");
            String albumNmae = musicInfo.getString("albumname");
            String mediaMid = musicInfo.getString("media_mid");
            String songMid = musicInfo.getString("songmid");
            int duration = musicInfo.getInteger("interval");
            JSONArray singers = JSONObject.parseArray(musicInfo.getString("singer"));
            JSONObject singer = singers.getJSONObject(0);
            String singerName = singer.getString("name");
            Music music = new Music(songid, title , singerName, duration);
            music.setAlbumName(albumNmae);
            music.setMediaMid(mediaMid);
            music.setSongMid(songMid);

            String pictureId = musicInfo.getString("albummid");
            music.setPictureId(pictureId);
            music.setPictureURL(pictureIdToURL(pictureId));

            String streamURL = getStreamURL(songMid, mediaMid);
            music.setStreamURL(streamURL);

            musics.add(music);
        }
        return musics;
    }

    @Override
    public List<Music> searchMusics(String provider, String keyWord, int limit) {
        System.out.println("keyWord" + keyWord);
        String key = keyWord;//" 追光者";
        String url = String.format("https://c.y.qq.com/soso/fcgi-bin/client_search_cp?&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=%s", key);

        Connection.Response response = null;
        try {
            response = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
                    .header("Accept", "*/*")
                    .header("Cache-Control", "no-cache")
                    .header("Connection", "keep-alive")
                    //.header("Refener", "https://y.qq.com/portal/player.html")
                    .header("Accept-Language", "zh-CN,en-US;q=0.7,en;q=0.3")
                    .header("Pragma", "no-cache")
                    .header("Cookie", "pgv_pvi=22038528; pgv_si=s3156287488; pgv_pvid=5535248600; yplayer_open=1; ts_last=y.qq.com/portal/player.html; ts_uid=48     47550686; yq_index=0; qqmusic_fromtag=66; player_exist=1")
                    .method(Connection.Method.GET)
                    .ignoreContentType(true)
                    .timeout(5000)
                    .execute();
        } catch (IOException e1) {
            e1.printStackTrace();
            return null;
        }
        String body = response.body();
        body = body.substring(9, body.length() - 1);
        System.out.println("body" + body);
        if (body !=  null) {
            return convertToMusics(body, limit);
        }
        return null;
    }

    private String getStreamURL(String musicId, String mediaMid) {
        String url = new StringBuilder(100)
                .append("https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?&jsonpCallback=MusicJsonCallback&cid=205361747&songmid=")
                .append(musicId).append("&filename=C400").append(mediaMid).append(".m4a&guid=6612300644").toString();
        Connection.Response response = null;
        try {
            response = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
                    .header("Accept", "*/*")
                    .header("Cache-Control", "no-cache")
                    .header("Connection", "keep-alive")
                    //.header("Refener", "https://y.qq.com/portal/player.html")
                    .header("Accept-Language", "zh-CN,en-US;q=0.7,en;q=0.3")
                    .header("Pragma", "no-cache")
                    .header("Cookie", "pgv_pvi=22038528; pgv_si=s3156287488; pgv_pvid=5535248600; yplayer_open=1; ts_last=y.qq.com/portal/player.html; ts_uid=48     47550686; yq_index=0; qqmusic_fromtag=66; player_exist=1")
                    .method(Connection.Method.GET)
                    .ignoreContentType(true)
                    .timeout(10000)
                    .execute();
        } catch (IOException e1) {
            e1.printStackTrace();
            return null;
        }
        String body = response.body();
        logger.debug("stream URL {}", body);
        System.out.println("stream URL" + body);
        if (body !=  null) {
            JSONObject jsonBody = JSON.parseObject(body);
            JSONObject data = jsonBody.getJSONObject("data");
            JSONArray items = data.getJSONArray("items");
            if (items.isEmpty()) {
                return null;
            }
            JSONObject item = items.getJSONObject(0);
            String fileName = item.getString("filename");
            String vKey = item.getString("vkey");
            String streamURL = new StringBuilder(100).append("https://dl.stream.qqmusic.qq.com/")
                    .append(fileName).append("?vkey=").append(vKey)
                    .append("&guid=6612300644&uin=0&fromtag=66")
                    .toString();
            return streamURL;
        }
        return null;
    }
}
