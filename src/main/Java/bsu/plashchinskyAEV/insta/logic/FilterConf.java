package bsu.plashchinskyAEV.insta.logic;

import java.util.Calendar;
import java.util.Date;

public class FilterConf {
    char whichOne;
    Date createdAt;
    String author;
    String[] hashtags;
    public FilterConf(){
        whichOne = 'n';
    }
    public FilterConf (int ca){
        whichOne = 'd';
        createdAt = new Date();
        Calendar cal = Calendar.getInstance();
        cal.set(0, 0, ca);
        createdAt = cal.getTime();
        hashtags = new String[0];
        author = "0";
    }
    public FilterConf (String a){
        whichOne = 'a';
        createdAt = new Date();
        hashtags = new String[0];
        author = a;
    }
    public FilterConf (String[] h){
        whichOne = 'h';
        createdAt = new Date();
        hashtags = new String[h.length];
        for(int i = 0; i < h.length; i++) {
            hashtags[i] = h[i];
        }
        author = "0";
    }
}
