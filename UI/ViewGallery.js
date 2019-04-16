/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
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

  _createPost(item, container, name) {
    if (name === item.author) {
      const photo = document.createElement('div');
      photo.classList.add('photo');
      photo.id = item.id;
      photo.innerHTML = `
        <img src=${item.photoLink} class = "forImages">
        <div class = "forComments">
          <textarea name="comments" id="${item.id}T" cols="30" rows="10"
          class = "forComments__comments">
          ${item.description}
          ${item.author}
          added on ${this._reformDate(item.createdAt)}
          ${item.hashTags}
          Liked by: 
          ${item.likes}</textarea>
          <input placeholder="Link" class = "forR" id = "${item.id}l"> </input>
          <input placeholder="Description" class = "forR" id = "${item.id}d"> </input>
          <input placeholder="Hashtags" class = "forR" id = "${item.id}h"> </input>
          <input type = "image" src = "redact.png" class = "forRedact" id = "${item.id}R" title = ${item.author}>
          <input type = "image" src = "like.png" class = "forLikes" id = "${item.id}L">
          <input type = "image" src = "delete.png" class = "forDelete" id = "${item.id}D" title = ${item.author}>

        </div>`;
      container.appendChild(photo);
    }
    if (name !== item.author) {
      const photo = document.createElement('div');
      photo.classList.add('photo');
      photo.id = item.id;
      photo.innerHTML = `
        <img src=${item.photoLink} class = "forImages">
        <div class = "forComments">
          <textarea name="comments" id="${item.id}T" cols="30" rows="10"
          class = "forComments__comments">
          ${item.description}
          ${item.author}
          ${item.hashTags}
          added on ${this._reformDate(item.createdAt)}
          Liked by: 
          ${item.likes}
          </textarea>
          <input type = "image" src = "redact.png" class = "forRedact" id = "${item.id}R" title = ${item.author}>
          <input type = "image" src = "like.png" class = "forLikes" id = "${item.id}L">
          <input type = "image" src = "delete.png" class = "forDelete" id = "${item.id}D" title = ${item.author}>
        </div>`;
      container.appendChild(photo);
    }
  }

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
    return (`${date.toLocaleDateString('en-US', dateOptions)} ${date.toLocaleTimeString('en-US', timeOptions)}`);
  }

  update(posts, name) {
    this._shown = 0;
    const zer = document.getElementById('photos');
    zer.innerHTML = '';
    this.showPhotoPosts(posts, 0, 10, name);
  }

  showPost(post, name) {
    const photos = document.getElementById('photos');
    this._createPost(post, photos, name);
  }

  showPhotoPosts(gallery, skip, amount, name) {
    gallery._sort();
    for (let a = skip; a < amount + skip; a += 1) {
      this.showPost(gallery.getByOrder(a), name);
    }
    this._shown += (amount);
  }

  showPhotoPostsWithout(gallery, skip, amount, name) {
    for (let a = skip; a < amount; a += 1) {
      this.showPost(gallery.getByOrder(a), name);
    }
  }

  showPhotoPostsWith(gallery, skip, amount, newPost, name) {
    const zer = document.getElementById('photos');
    zer.innerHTML = '';
    for (let a = skip; a < (gallery.getPage(skip, amount, newPost)).length; a += 1) {
      this.showPost(gallery.getPage(skip, amount, newPost)[a], name);
    }
  }

  removePost(posts, id, name) {
    posts.remove(id);
    this._shown -= 1;
    const zer = document.getElementById('photos');
    zer.innerHTML = '';
    this.showPhotoPostsWithout(posts, 0, this._shown, name);
  }

  loadMore(posts, name) {
    const ten = (posts.getlenght() - this._shown) > 10 ? 10 : posts.getlenght() - this._shown;
    this.showPhotoPosts(posts, this._shown, ten, name);
  }

  setFilter(filter) {
    this._curFilter = filter;
  }

  edit(posts, id, name, newPost) {
    posts.edit(id, newPost);
    const zer = document.getElementById('photos');
    zer.innerHTML = '';
    this.showPhotoPostsWithout(posts, 0, this._shown, name);
  }

  addALike(posts, id, name) {
    posts.addALike(id, name);
    const zer = document.getElementById('photos');
    zer.innerHTML = '';
    this.showPhotoPostsWithout(posts, 0, this._shown, name);
  }
}
