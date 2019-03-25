/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
class PostCollection {
  constructor(temp = []) {
    this._photoPosts = [];
    for (let i = 0; i < temp.length; i += 1) {
      if (this.validate(temp[i])) {
        this._photoPosts[i] = temp[i];
      }
    }
    this._lenght = this._photoPosts.length;
  }

  getlenght() {
    return this._lenght;
  }

  addAll(temp) {
    const arrayOfNotValidate = [];
    let count = 0;
    for (let i = 0; i < temp.length; i += 1) {
      if (this.validate(temp[i])) {
        this._photoPosts[i] = temp[i];
      } else {
        arrayOfNotValidate[count] = temp[i];
        count += 1;
      }
    }
    this._lenght = this._photoPosts.length;
    return arrayOfNotValidate;
  }

  _sort() {
    let temp;
    for (let j = 1; j < this._photoPosts.length - 1; j += 1) {
      for (let i = j; i > 0; i -= 1) {
        if (this._photoPosts[i - 1].createdAt.getTime() < this._photoPosts[i].createdAt.getTime()) {
          temp = this._photoPosts[i];
          this._photoPosts[i] = this._photoPosts[i - 1];
          this._photoPosts[i - 1] = temp;
        }
      }
    }
  }

  getPage(skip, top, filterConfig) {
    this._sort();
    let i;
    let j;
    if (skip === undefined) {
      i = 0;
    } else {
      i = skip;
    }
    if (top == undefined) {
      j = 10;
    } else {
      j = top;
    }
    const temp = [];
    for (; j != 0 && i < this._photoPosts.length; i += 1) {
      if (filterConfig == undefined || this._isappropriate(this._photoPosts[i], filterConfig)) {
        if (this._addPhotoPost(temp, this._photoPosts[i])) {
          j -= 1;
        }
      }
    }
    return temp;
  }

  // eslint-disable-next-line class-methods-use-this
  _isappropriate(photoPost, filterConfig) {
    if (filterConfig.author !== undefined) {
      if (filterConfig.author == photoPost.author) {
        return true;
      }
      return false;
    }
    if (filterConfig.createdAt !== undefined) {
      if (filterConfig.createdAt.getDate() == photoPost.createdAt.getDate()
            && filterConfig.createdAt.getFullYear() == photoPost.createdAt.getFullYear()
            && filterConfig.createdAt.getMonth() == photoPost.createdAt.getMonth()) {
        return true;
      }
      return false;
    }
    if (filterConfig.hashTags !== undefined) {
      if (filterConfig.hashTags == photoPost.hashTags) {
        return true;
      }
      return false;
    }
    return false;
  }

  _addPhotoPost(mas, photoPost) {
    if (this.validate(photoPost)) {
      // eslint-disable-next-line no-param-reassign
      mas[mas.length] = photoPost;
      return true;
    }
    return false;
  }

  add(photoPost) {
    if (this.validate(photoPost)) {
      this._photoPosts[this._photoPosts.length] = photoPost;
      this._lenght = this._photoPosts.length;
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  validate(photoPost) {
    if (typeof (photoPost.id) == typeof ('1')
    && typeof (photoPost.hashTags) == typeof (['1'])
    && typeof (photoPost.description) == typeof ('1')
    && typeof (photoPost.author) == typeof ('1')
    && typeof (photoPost.createdAt) == typeof (new Date())
    && typeof (photoPost.photoLink) == typeof ('1')) {
      return true;
    }
    return false;
  }

  get(id) {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (this._photoPosts[i].id == id) {
        return this._photoPosts[i];
      }
    }
    return null;
  }

  getByOrder(a) {
    return this._photoPosts[a];
  }

  edit(id, photoPost) {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id == id) {
        if (photoPost.description !== undefined) {
          this._photoPosts[i].description = photoPost.description;
        }
        if (photoPost.hashTags !== undefined) {
          this._photoPosts[i].hashTags = photoPost.hashTags;
        }
        if (photoPost.photoLink !== undefined) {
          this._photoPosts[i].photoLink = photoPost.photoLink;
        }
        return true;
      }
    }
    return false;
  }

  remove(id) {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id == id) {
        this._photoPosts.splice(i, 1);
        this._lenght = this._photoPosts.length;
        return true;
      }
    }
    return false;
  }

  clear() {
    this._photoPosts = null;
    this._photoPosts = [];
    this._lenght = 0;
  }

  addALike(id, name) {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id == id) {
        this._photoPosts[i].likes[this._photoPosts[i].likes.length] = name;
        return true;
      }
    }
    return false;
  }
}

const temporary = [
  {
    id: '1',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['SoMe'],
    likes: ['mother', 'sonnofmomsfriend', 'dog', 'AJR']
  },
  {
    id: '2',
    description: 'Look at me touching stuff!',
    createdAt: new Date('2018-03-11T23:16:22'),
    author: 'user_73304',
    photoLink: 'picture2.jpg',
    hashTags: ['SoMe', 'Relatable'],
    likes: ['mother', 'sonnofmomsfriend']
  },
  {
    id: '3',
    description: 'My friends are the best!',
    createdAt: new Date('2018-03-09T23:23:22'),
    author: 'user_73304',
    photoLink: 'picture3.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '4',
    description: 'Coming back to university...',
    createdAt: new Date('2018-03-09T23:8:02'),
    author: 'user_73304',
    photoLink: 'picture4.jpg',
    hashTags: ['bored'],
    likes: ['sonnofmomsfriend']
  },
  {
    id: '5',
    description: 'So beautiful!',
    createdAt: new Date('2018-03-09T23:5:02'),
    author: 'Mr. Snow',
    photoLink: 'picture5.jpg',
    hashTags: ['wow'],
    likes: ['mother']
  },
  {
    id: '6',
    description: 'When you need to make a website in a week',
    createdAt: new Date('2018-03-01T19:41:12'),
    author: 'user_73304',
    photoLink: 'picture6.jpg',
    hashTags: ['amiright'],
    likes: ['mother', 'AJR', 'sonnofmomsfriend']
  },
  {
    id: '7',
    description: 'Look what I found in my grandma house!',
    createdAt: new Date('2018-03-01T18:55:12'),
    author: 'Mr. Snow',
    photoLink: 'picture7.jpg',
    hashTags: ['old'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '8',
    description: 'Did u miss me?',
    createdAt: new Date('2018-03-01T17:35:12'),
    author: 'user_73304',
    photoLink: 'picture8.jpg',
    hashTags: ['Me', 'hashtad'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '9',
    description: 'Good morning!',
    createdAt: new Date('2018-03-01T09:55:12'),
    author: 'Mr. Snow',
    photoLink: 'picture9.jpg',
    hashTags: ['early'],
    likes: ['mother', 'dad', 'AJR']
  },
  {
    id: '10',
    description: 'Hitting depression once again!',
    createdAt: new Date('2018-03-01T23:04:20'),
    author: 'user_73304',
    photoLink: 'picture10.jpg',
    hashTags: ['Sameoldme', 'hashtag'],
    likes: ['depression']
  },
  {
    id: '11',
    description: 'Reding',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture11.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '12',
    description: 'Cute',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture12.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '13',
    description: 'Nature',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture13.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  }
];


class ViewGallery {
  constructor() {
    this._shown = 0;
    this._curFilter = '';
  }

  incrementShown() {
    this._shown += 1;
  }

  decrementShown() {
    this._shown -= 1;
  }

  _createPost(item, container) {
    const photo = document.createElement('div');
    photo.classList.add('photo');
    photo.id = item.id;
    photo.innerHTML = `
    <img src=${item.photoLink} class = "forImages">
    <div class = "forComments">
       <textarea name="comments" id="" cols="30" rows="10"
       class = "forComments__comments">
       ${item.description}
       ${item.author}
       ${item.hashTags}
       added on ${this._reformDate(item.createdAt)}
      </textarea>
      <input type = "image" src = "redact.png" class = "forRedact">
      <input type = "image" src = "like.png" class = "forLikes">
      <input type = "image" src = "delete.png" class = "forDelete">
    </div>`;
    container.appendChild(photo);
  }

  // eslint-disable-next-line class-methods-use-this
  _reformDate(date) {
    const dateOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    };
    return (`${date.toLocaleDateString('en-US', dateOptions) } ${date.toLocaleTimeString('en-US', timeOptions)}`);
  }

  showPost(post) {
    const photos = document.getElementById('photos');
    this._createPost(post, photos);
  }

  showPhotoPosts(gallery, skip, amount) {
    for (let a = skip; a < amount; a += 1) {
      this.showPost(gallery.getByOrder(a));
    }
    this._shown += (amount);
  }

  showPhotoPostsWithout(gallery, skip, amount) {
    for (let a = skip; a < amount; a += 1) {
      this.showPost(gallery.getByOrder(a));
    }
  }

  showPhotoPostsWith(gallery, skip, amount, newPost) {
    const zer = document.getElementById('photos');
    zer.innerHTML = ``;
    for (let a = skip; a < (gallery.getPage(skip, amount, newPost)).length; a += 1) {
      this.showPost(gallery.getPage(skip, amount, newPost)[a]);
    }
  }


  removePost(posts, id) {
    posts.remove(id);
    this._shown -= 1;
    const zer = document.getElementById('photos');
    zer.innerHTML = ``;
    this.showPhotoPostsWithout(posts, 0, this._shown);
  }

  loadMore(posts) {
    const ten = (posts.getlenght() - this._shown) > 10 ? 10 : posts.getlenght() - this._shown;
    this.showPhotoPosts(posts, this._shown, ten);
  }

  setFilter(filter) {
    this._curFilter = filter;
  }

  edit(posts, id, newPost) {
    posts.edit(id, newPost);
    const zer = document.getElementById('photos');
    zer.innerHTML = ``;
    this.showPhotoPostsWithout(posts, 0, this._shown);
  }
}

class User {
  constructor(name, path) {
    if (name !== '') {
      this._name = name;
      this._photoPath = path;
      const parent = document.getElementById('whoAreYou');
      parent.innerHTML = `<headertext class = "profileText">Welcome,${name}</headertext>
      <img src = "${path}" class = "profilePicture">`;
    }
    else {
      const parent = document.getElementById('whoAreYou');
      parent.innerHTML = `<headertext class = "profileText">LogIn to become cool!</headertext>
      <img src = "whoAreYou.jpg" class = "profilePicture">`;
    }
  }

  set userName(name = '') {
    this._name = name;
  }

  set userPhoto(path) {
    this._photoPath = path;
  }

  get userName() {
    return this._name;
  }
}

const posts = new PostCollection(temporary);
const viewer = new ViewGallery();
const user = new User("user_73394", "profile_picture.jpg");

viewer.showPhotoPosts(posts, 0, 4);

viewer.loadMore(posts);
viewer.removePost(posts, 1);
const newPost = {
  hashTags: ['New HashTag', 'Very new HashTag']
};
const Additional = {
  author: 'Mr. Snow'
};
viewer.edit(posts, 3, newPost);

viewer.showPhotoPostsWith(posts, 0, 2, Additional);
