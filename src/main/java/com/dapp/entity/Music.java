package com.dapp.entity;

/**
 * Created by liuwenxue on 17/05/2018.
 */

public final class Music {
    //@Id
    private String id;
    private String title;
    private String comment;
    private String singer;
    private int duration; //sec
    private String pictureURL;
    private String streamURL;
    private String songMid;
    private String mediaMid;

    //@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")

    public Music(String id) {
        this.id = id;
    }

    public Music(String id, String title, String singer, int duration) {
        this.id = id;
        this.title = title;
        this.comment = "";
        this.singer = singer;
        this.duration = duration;
    }

    public Music(String id, String title, String singer) {
        this.id = id;
        this.title = title;
        this.comment = "";
        this.singer = singer;
    }

    public String getId() {
        return id;
    }

    public Music setId(String id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Music setTitle(String title) {
        this.title = title;
        return this;
    }

    public int getDuration() {
        return duration;
    }

    public Music setDuration(int duration) {
        this.duration = duration;
        return this;
    }

    public String getSinger() {
        return singer;
    }

    public Music setSinger(String singer) {
        this.singer = singer;
        return this;
    }

    public String getComment() {
        return comment;
    }

    public Music setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public String getPictureURL() {
        return pictureURL;
    }

    public Music setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
        return this;
    }

    public String getSongMid() {
        return songMid;
    }

    public Music setSongMid(String songMid) {
        this.songMid = songMid;
        return this;
    }

    public String getMediaMid() {
        return mediaMid;
    }

    public Music setMediaMid(String mediaMid) {
        this.mediaMid = mediaMid;
        return this;
    }

    public String getStreamURL() {
        return streamURL;
    }

    public Music setStreamURL(String streamURL) {
        this.streamURL = streamURL;
        return this;
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

        Music other = (Music)obj;
        if (! (other instanceof Music)) {
            return false;
        }

        return this.id.equals(other.id);
    }
}
