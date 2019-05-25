package bsu.plashchinskyAEV.insta.logic;

import java.util.Arrays;
import java.util.Date;

public class PhotoPost {
    String id;
    String description;
    Date createdAt;
    String author;
    String photoLink;
    String[] hashTags;
    String[] likes;

    public PhotoPost(String i, String d, Date ca, String a, String pl, String[] ht, String[] l){
        id = i;
        description = d;
        createdAt = ca;
        author = a;
        photoLink = pl;
        hashTags = new String[ht.length];
        hashTags = Arrays.copyOf(ht, ht.length);
        likes = new String[l.length];
        likes = Arrays.copyOf(l, l.length);
    }
    public PhotoPost(String d, String pl, String[] ht){
        id = "-1";
        description = d;
        createdAt = new Date();
        author = "";
        photoLink = pl;
        hashTags = new String[ht.length];
        hashTags = Arrays.copyOf(ht, ht.length);
        likes = new String[0];
    }
    public PhotoPost(){
        id = "-1";
        description = "0";
        author = "0";
    }
}