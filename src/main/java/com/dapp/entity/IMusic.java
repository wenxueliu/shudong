package com.dapp.entity;


import java.util.Date;

/**
 * Created by liuwenxue on 17/05/2018.
 */
public interface  IMusic {
    public String getId();
    public IMusic setId(String id);
    public String getTitle();
    public IMusic setTitle(String title);
    public int getComment();
    public IMusic setComment(String comment);
    public String getSinger();
    public IMusic setSinger(String singer);
    public int getDuration();
    public IMusic setDuration(int duration);
    public String getPictureId();
    public IMusic setPictureId(String pictureId);
}
