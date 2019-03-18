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
        return true;
      }
    }
    return false;
  }

  clear() {
    this._photoPosts = null;
    this._photoPosts = [];
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

// this function is not for class, so I'll leave it here
function changingColours() {
  const heading = document.querySelector('changingcolor');
  // eslint-disable-next-line prefer-template
  const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
  + (Math.floor(Math.random() * 256)) + ','
  + (Math.floor(Math.random() * 256)) + ')';
  heading.style.color = hue;
}
setInterval(changingColours, 1000);

const photoPost = {
  author: 'Mr. Snow',
  description: 'NEW DESCRIPTION'
};

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
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '12',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '13',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '14',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '15',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '16',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '17',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '18',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '19',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  },
  {
    id: '20',
    description: 'Me, when I need to work on the cite',
    createdAt: new Date('2018-03-10T23:19:12'),
    author: 'user_73304',
    photoLink: 'picture1.jpg',
    hashTags: ['BFF', 'Evening'],
    likes: ['mother', 'dad', 'sonnofmomsfriend']
  }
];

const PC = new PostCollection(temporary);

console.log('first two ellements after creati:');
console.log(PC.get(1));
console.log(PC.get(2));

console.log('photos of Mr. Snow:');
let example = PC.getPage(0, 5, photoPost);

for (let i = 0; i < example.length; i += 1) {
  console.log(example[i]);
}

photoPost.author = 'Dad';
console.log('photos of Dad:');
example = PC.getPage(0, 5, photoPost);
for (let i = 0; i < example.length; i += 1) {
  console.log(example[i]);
}

PC.edit(5, photoPost);
console.log('Photo with id 5 with changed description:');
console.log(PC.get(5));

const photo = {
  id: 1
};

console.log('Search with wrong id:');
console.log(PC.get(photo));


const newArray = [
  {
    id: '21',
    description: 'Just give me a second, darling, to clear my head.',
    createdAt: new Date('2018-03-17T23:19:12'),
    author: 'On the single bed',
    photoLink: 'Icamethroughthunder.jpg',
    hashTags: [' the cold wind', 'the rain', 'the snow'],
    likes: ['mother', 'sonnofmomsfriend', 'dog', 'AJR']
  },
  {
    id: '22',
    description: 'I broke down in horror at you standing there',
    createdAt: new Date('2018-03-17T23:16:22'),
    author: 'Iquestionedyourdoubt',
    photoLink: 'picture2.jpg',
    hashTags: ['talking', 'to God', 'now'],
    likes: ['mother', 'sonnofmomsfriend']
  },
  {
    id: 22,
    escription: 'I broke down in horror at you standing there',
    createdAt: new Date('2018-03-17T23:16:22'),
    author: 'Iquestionedyourdoubt',
    hotoLink: 'picture2.jpg',
    hashTags: ['talking', 'to God', 'now'],
    likes: ['mother', 'sonnofmomsfriend']
  }];

console.log('Not valid elements in new array: ');
console.log(PC.addAll(newArray));
console.log('Check if new elements are in our Array:');
console.log(PC.get(22));
console.log(PC.get(21));

console.log('Adding a like to post with id 22:');
PC.addALike(22, 'Hutts');
console.log(PC.get(22));

PC.remove(22);
console.log('Check if deleted element is still in array:');
console.log(PC.get(22));
