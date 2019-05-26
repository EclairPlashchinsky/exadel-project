package bsu.plashchinskyAEV.insta.logic;

import java.util.Arrays;

public class PostCollection {
    PhotoPost[] photoPosts;
    public int lenght;
    public PostCollection() {
        photoPosts = new PhotoPost[0];
        lenght = 0;
    }
    public PostCollection(PhotoPost[] temp) {
        int len = 0;
        photoPosts = new PhotoPost[temp.length];
        for (int i = 0; i < temp.length; i ++) {
            if (validate(temp[i])) {
                photoPosts[i] = temp[i];
                len++;
            }
        }
        lenght = len;
        sort();
    }

    int getlenght() {
        return lenght;
    }

    PhotoPost[] addAll(PhotoPost[] temp) {
        int[] unvalid = new int[temp.length];
        int count = 0;
        for (int i = 0; i < temp.length; i++) {
            if (this.validate(temp[i])) {
                photoPosts[i] = temp[i];
            } else {
                unvalid[count] = i;
                count ++;
                i--;
            }
        }
        PhotoPost[] arrayOfNotValidate = new PhotoPost[count];
        for (int i = 0; i < count; i++){
            arrayOfNotValidate[i] = temp[unvalid[i]];
        }
        lenght = photoPosts.length;
        return arrayOfNotValidate;
    }

    void sort() {
        PhotoPost temp;
        for (int j = 1; j < photoPosts.length; j += 1) {
            for (int i = j; i > 0; i --) {
                if (photoPosts[i - 1].createdAt.getTime() < photoPosts[i].createdAt.getTime()) {
                    temp = photoPosts[i];
                    photoPosts[i] = photoPosts[i - 1];
                    photoPosts[i - 1] = temp;
                }
            }
        }
    }

    public PhotoPost[] getPage(int skip, int top) {
        sort();
        int i;
        int j;
        i = skip;
        j = top;
        PhotoPost[] temp = new PhotoPost[j];
        for (; j != 0 && i < photoPosts.length; i ++) {
            if (addPhotoPost(temp, photoPosts[i])) {
               j --;
            }
        }
        if(j != 0){
            PhotoPost[] resque = new PhotoPost[i-skip];
            resque = Arrays.copyOf(temp, resque.length);
            return resque;
        }
        return temp;
    }


    public PhotoPost[] getPage(int skip, int top, FilterConf filterConfig) {
        if(filterConfig.whichOne == 'n'){
            PhotoPost[] temp = getPage(skip, top);
            return temp;
        }
        sort();
        int i;
        int j;
        i = skip;
        j = top;
        PhotoPost[] temp = new PhotoPost[j];
        for (; j != 0 && i < photoPosts.length; i ++) {
            if (isappropriate(photoPosts[i], filterConfig)) {
                if (addPhotoPost(temp, photoPosts[i])) {
                    j --;
                }
            }
        }
        if(j != 0){
            PhotoPost[] resque = new PhotoPost[i-skip];
            resque = Arrays.copyOf(temp, resque.length);
            return resque;
        }
        return temp;
    }

    boolean isappropriate(PhotoPost photoPost, FilterConf filterConfig) {
        if (filterConfig.whichOne == 'a') {
            if (filterConfig.author.equals(photoPost.author)) {
                return true;
            }
            return false;
        }
        if (filterConfig.whichOne == 'd') {
            if (filterConfig.createdAt == photoPost.createdAt) {
                return true;
            }
            return false;
        }
        if (filterConfig.whichOne == 'h') {
            for (int i = 0; i < photoPost.hashTags.length; i ++) {
                if (filterConfig.hashtags[0].equals(photoPost.hashTags[i])) {
                    return true;
                }
            }
            return false;
        }
        if(filterConfig.whichOne == 'n'){
            return true;
        }
        return false;
    }

    boolean addPhotoPost(PhotoPost[] mas, PhotoPost photoPost) {
        if (this.validate(photoPost)) {
            PhotoPost[] tmp = Arrays.copyOf(mas, mas.length+1);
            tmp[mas.length] = photoPost;
            mas = Arrays.copyOf(tmp, mas.length+1);
            return true;
        }
        return false;
    }

    public boolean add(PhotoPost photoPost) {
        if (this.validate(photoPost)) {
            PhotoPost[] temp = Arrays.copyOf(this.photoPosts, this.photoPosts.length+1);
            temp[this.photoPosts.length] = photoPost;
            this.photoPosts = Arrays.copyOf(temp, this.photoPosts.length+1);
            this.lenght = this.photoPosts.length;
            return true;
        }
        return false;
    }

    boolean validate(PhotoPost photoPost) {
    if (photoPost.id != "-1"
        && photoPost.description != "0"
        && photoPost.author != "0") {
            return true;
        }
        return false;
    }

    public PhotoPost get(String id) {
        for (int i = 0; i < this.photoPosts.length; i += 1) {
            if (this.photoPosts[i].id.equals(id)) {
                return this.photoPosts[i];
            }
        }
        return null;
    }

    PhotoPost getByOrder(int a) {
        return this.photoPosts[a];
    }

    public boolean edit(String id, PhotoPost photoPost) {
        for (int i = 0; i < this.photoPosts.length; i += 1) {
            if (this.photoPosts[i].id.equals(id)) {
                if (photoPost.description != "0") {
                    this.photoPosts[i].description = photoPost.description;
                }
                if (photoPost.hashTags[0] != "0") {
                    this.photoPosts[i].hashTags = Arrays.copyOf(photoPost.hashTags, photoPost.hashTags.length);
                }
                if (photoPost.photoLink != "0") {
                    this.photoPosts[i].photoLink = photoPost.photoLink;
                }
                return true;
            }
        }
        return false;
    }

    public boolean remove(String id) {
        for (int i = 0; i < this.photoPosts.length; i += 1) {
            if (this.photoPosts[i].id.equals(id)) {
                this.lenght = this.photoPosts.length - 1;
                PhotoPost[] temp = Arrays.copyOf(photoPosts, photoPosts.length);
                for(int j = i+1; j < temp.length - 1; j++){
                    temp[j-1] = photoPosts[j];
                }
                photoPosts = Arrays.copyOf(temp, temp.length-1);
                return true;
            }
        }
        return false;
    }

    void clear() {
        this.photoPosts = null;
        this.photoPosts = new PhotoPost[0];
        this.lenght = 0;
    }

    boolean addALike(String id, String name) {
        int marker = 0;
        for (int i = 0; i < this.photoPosts.length; i += 1) {
            if (this.photoPosts[i].id.equals(id)) {
                for (int h = 0; h < this.photoPosts[i].likes.length; h += 1) {
                    if (this.photoPosts[i].likes[h].equals(name)) {
                        marker = 1;
                    }
                }
                if (marker == 0) {
                    if (this.photoPosts[i].likes[this.photoPosts[i].likes.length - 1] == " ") {
                        this.photoPosts[i].likes[this.photoPosts[i].likes.length - 1] = name;
                    } else {
                        String[] lik = Arrays.copyOf(photoPosts[i].likes, photoPosts[i].likes.length+1);
                        lik[lik.length-1] = name;
                        photoPosts[i].likes = Arrays.copyOf(lik, lik.length);
                    }
                } else if (marker == 1) {
                    for (int j = 0; j <= this.photoPosts[i].likes.length; j += 1) {
                        if (photoPosts[i].likes[j].equals(name)) {
                            String[] temp  = Arrays.copyOf(photoPosts[i].likes, photoPosts[i].likes.length);
                            for(int g = i+1; g < temp.length - 1; g++){
                                temp[g-1] = photoPosts[i].likes[g];
                            }
                            photoPosts[i].likes = Arrays.copyOf(temp, temp.length);
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }
};
