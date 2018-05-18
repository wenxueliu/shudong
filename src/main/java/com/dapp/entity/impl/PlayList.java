package com.dapp.entity.impl;


import java.util.Date;

/**
 * Created by liuwenxue on 17/05/2018.
 */
//@Data
//@Entity
public class PlayList {
    /**
     * 歌单id
     */
    //@Id
    private String id;

    /**
     * 歌单名称
     */
    private String title;

    /**
     * 歌单音乐数量
     */
    private int musicCount;

    /**
     * 歌单播放次数
     */
    private int playCount;

    /**
     * 收藏数
     */
    private int favoriteCount;

    /**
     * 歌单评论数
     */
    private int commentCount;

    /**
     * 更新时间
     */
    //@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updateTime;

    public PlayList() {
    }

    public PlayList(String title, String id, int musicCount, int playCount, int favoriteCount, int commentCount) {
        this.title = title;
        this.id = id;
        this.musicCount = musicCount;
        this.playCount = playCount;
        this.favoriteCount = favoriteCount;
        this.commentCount = commentCount;
    }

    public PlayList(String title, String id, int musicCount, int playCount, int favoriteCount, int commentCount, Date updateTime) {

        this.title = title;
        this.id = id;
        this.musicCount = musicCount;
        this.playCount = playCount;
        this.favoriteCount = favoriteCount;
        this.commentCount = commentCount;
        this.updateTime = updateTime;
    }
}
