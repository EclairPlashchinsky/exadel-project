/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class PostCollection {
  constructor(temp = []) {
    this._photoPosts = [];
    for (let i = 0; i < temp.length; i += 1) {
      if (this.validate(temp[i])) {
        this._photoPosts[i] = temp[i];
      }
    }
    this._lenght = this._photoPosts.length;
    this._sort();
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
    for (let j = 1; j < this._photoPosts.length; j += 1) {
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
    if (top === undefined) {
      j = 10;
    } else {
      j = top;
    }
    const temp = [];
    for (; j !== 0 && i < this._photoPosts.length; i += 1) {
      if (filterConfig === undefined || this._isappropriate(this._photoPosts[i], filterConfig)) {
        if (this._addPhotoPost(temp, this._photoPosts[i])) {
          j -= 1;
        }
      }
    }
    return temp;
  }

  _isappropriate(photoPost, filterConfig) {
    if (filterConfig.author !== undefined) {
      if (filterConfig.author === photoPost.author) {
        return true;
      }
      return false;
    }
    if (filterConfig.createdAt !== undefined) {
      if (filterConfig.createdAt.getDate() === photoPost.createdAt.getDate()) {
        return true;
      }
      return false;
    }
    if (filterConfig.hashTags !== undefined) {
      for (let i = 0; i < photoPost.hashTags.length; i += 1) {
        if (filterConfig.hashTags === photoPost.hashTags[i]) {
          return true;
        }
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

  validate(photoPost) {
    if (typeof (photoPost.id) === typeof ('1')
    && typeof (photoPost.hashTags) === typeof (['1'])
    && typeof (photoPost.description) === typeof ('1')
    && typeof (photoPost.author) === typeof ('1')
    && typeof (photoPost.createdAt) === typeof (new Date())
    && typeof (photoPost.photoLink) === typeof ('1')) {
      return true;
    }
    return false;
  }

  get(id) {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id === id) {
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
      if (this._photoPosts[i].id === id) {
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
      if (this._photoPosts[i].id === id) {
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
    let marker = 0;
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id === id) {
        for (let h = 0; h < this._photoPosts[i].likes.length; h += 1) {
          if (this._photoPosts[i].likes[h] === name) {
            marker = 1;
          }
        }
        if (marker === 0) {
          if (this._photoPosts[i].likes[this._photoPosts[i].likes.length - 1] === '') {
            this._photoPosts[i].likes[this._photoPosts[i].likes.length - 1] = name;
          } else {
            this._photoPosts[i].likes[this._photoPosts[i].likes.length] = name;
          }
        } else if (marker === 1) {
          for (let j = 0; j <= this._photoPosts[i].likes.length; j += 1) {
            if (this._photoPosts[i].likes[j] === name) {
              this._photoPosts[i].likes.splice(j, 1);
            }
          }
        }
        return true;
      }
    }
    return false;
  }

  save() {
    for (let i = 0; i < this._photoPosts.length; i += 1) {
      localStorage.setItem(`id${i}`, this._photoPosts[i].id);
      localStorage.setItem(`de${i}`, this._photoPosts[i].description);
      localStorage.setItem(`ca${i}`, this._photoPosts[i].createdAt.toISOString());
      localStorage.setItem(`au${i}`, this._photoPosts[i].author);
      localStorage.setItem(`pl${i}`, this._photoPosts[i].photoLink);
      for (let j = 0; j < this._photoPosts[i].hashTags.length; j+= 1) {
        localStorage.setItem(`ht${i}|${j}`, this._photoPosts[i].hashTags[j]);
      }
      for (let j = 0; j < this._photoPosts[i].likes.length; j+= 1) {
        localStorage.setItem(`li${i}|${j}`, this._photoPosts[i].likes[j]);
      }
    }
  }

  restore() {
    let stop;
    for (let i = 100; i > -1; i -= 1) {
      if (localStorage.getItem(`id${i}`) !== null) {
        stop = i;
        break;
      }
    }
    for (let j = 0; j < stop; j += 1) {
      this._photoPosts[j].id = localStorage.getItem(`id${j}`);
      this._photoPosts[j].description = localStorage.getItem(`de${j}`);
      this._photoPosts[j].createdAt = new Date(localStorage.getItem(`ca${j}`));
      this._photoPosts[j].author = localStorage.getItem(`au${j}`); 
      this._photoPosts[j].photoLink = localStorage.getItem(`pl${j}`);
      let len = 0;
      for (let h = 50; h >= 0; h -= 1) {
        if (localStorage.getItem(`ht${j}|${h}`) !== null) {
          len = h;
          break;
        }
      }
      for (let h = 0; h <= len; h += 1) {
        this._photoPosts[j].hashTags[h] = localStorage.getItem(`ht${j}|${h}`);
      }
      for (let h = 50; h > 0; h -= 1) {
        if (localStorage.getItem(`li${j}|${h}`) !== null) {
          len = h;
          break;
        }
      }
      for (let h = 0; h <= len; h += 1) {
        this._photoPosts[j].likes[h] = localStorage.getItem(`li${j}|${h}`);
      }
    }
  }
}
