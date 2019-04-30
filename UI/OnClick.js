/* eslint-disable no-undef */
let posts = new PostCollection(temporary);
if (localStorage.getItem('id0') !== null) {
  posts.restore();
}
let viewer = new ViewGallery();
let user = new User('user_73304', 'profile_picture.jpg');

viewer.showPhotoPosts(posts, 0, 10, user.name);
document.getElementById('Load').addEventListener('click', () => {
  viewer.loadMore(posts, user.name);
}, false);

function rec() {
  if (user.name === '') {
    if (document.getElementById('Log').value !== '' && document.getElementById('Pas').value !== '') {
      if (document.getElementById('Log').value === 'user_73304' && document.getElementById('Pas').value === 'qwerty') {
        user = new User(document.getElementById('Log').value, 'profile_picture.jpg');
        viewer.update(posts, user.name);
      } else if (document.getElementById('Log').value === 'Mr.Snow' && document.getElementById('Pas').value === '12345') {
        user = new User(document.getElementById('Log').value, 'profile_picture2.jpg');
        viewer.update(posts, user.name);
      } else if (document.getElementById('Log').value === 'sonnofmomsfriend' && document.getElementById('Pas').value === 'thebest') {
        user = new User(document.getElementById('Log').value, 'profile_picture3.jpg');
        viewer.update(posts, user.name);
      } 
      document.getElementById('PP').addEventListener('click', () => {
        rec();
      }, false);
    }
  } else {
    user = new User('', 'whoAreYou.jpg');
    document.getElementById('PP').addEventListener('click', () => {
      rec();
    }, false);
  }
}

document.getElementById('PP').addEventListener('click', () => {
  rec();
}, false);
document.getElementById('file-input').addEventListener('change', () => {
  const ir = new FileReader();
  ir.addEventListener('load', (evt) => {
    if (user.name !== '') {
      const newPost = {
        id: `${temporary.length + 1}`,
        description: '',
        createdAt: new Date(),
        author: user.name,
        hashTags: [''],
        photoLink: evt.target.result,
        likes: [''],
        flag: 0
      };
      temporary[temporary.length] = newPost;
      posts = new PostCollection(temporary);
      viewer = new ViewGallery();
      viewer.update(posts, user.name);
      posts.save();
    }
  });
  ir.readAsDataURL(document.getElementById('file-input').files[0]);
});
document.getElementById('searchH').addEventListener('click', () => {
  if (document.getElementById('try').value !== '') {
    const newPost = {
      hashTags: document.getElementById('try').value
    };
    viewer.showPhotoPostsWith(posts, 0, 10, newPost, user.name);
  }
});
document.getElementById('searchU').addEventListener('click', () => {
  if (document.getElementById('try').value !== '') {
    const newPost = {
      author: document.getElementById('try').value
    };
    viewer.showPhotoPostsWith(posts, 0, 10, newPost, user.name);
  }
});
document.getElementById('searchD').addEventListener('click', () => {
  if (document.getElementById('try').value !== '') {
    const date = new Date(`2018-03-${document.getElementById('try').value}T23:16:22`);
    const newPost = {
      createdAt: date
    };
    viewer.showPhotoPostsWith(posts, 0, 10, newPost, user.name);
  }
});
document.getElementById('photos').addEventListener('click', (evt) => {
  if (evt.target.className.includes('forLikes')) {
    if (user.name !== '') {
      const idd = evt.target.id;
      const r = idd.substring(0, idd.length - 1);
      viewer.addALike(posts, (r).toString(), user.name);
      posts.save();
    }
  }
  if (evt.target.className.includes('forDelete')) {
    const idd = evt.target.id;
    const r = idd.substring(0, idd.length - 1);
    if (user.name === evt.target.title) {
      viewer.removePost(posts, r, user.name);
      posts.save();
    }
  }
  if (evt.target.className.includes('forRedact')) {
    const idd = evt.target.id;
    const r = idd.substring(0, idd.length - 1);
    const forD = `${r}d`;
    const forL = `${r}l`;
    const forH = `${r}h`;
    if (document.getElementById(forD).value !== '') {
      const newPost = {
        description: document.getElementById(forD).value
      };
      viewer.edit(posts, r, user.name, newPost);
      posts.save();
    }
    if (document.getElementById(forL).value !== '') {
      const newPost = {
        photoLink: document.getElementById(forL).value
      };
      viewer.edit(posts, r, user.name, newPost);
      posts.save();
    }
    if (document.getElementById(forH).value !== '') {
      const HT = document.getElementById(forH).value;
      const newPost = {
        hashTags: HT.split(',')
      };
      viewer.edit(posts, r, user.name, newPost);
      posts.save();
    }
  }
}, false);
