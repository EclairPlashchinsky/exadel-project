/* eslint-disable no-unused-vars */
class User {
  constructor(name, path) {
    if (name !== '') {
      this.name = name;
      this._photoPath = path;
      const parent = document.getElementById('whoAreYou');
      parent.innerHTML = `<headertext class = "profileText">Welcome,${name}</headertext>
        <img src = "${path}" class = "profilePicture" id = "PP">`;
      const parentTwo = document.getElementById('sign');
      parentTwo.innerHTML = '';
    } else {
      const parent = document.getElementById('whoAreYou');
      this.name = name;
      parent.innerHTML = `  
        <img src = "whoAreYou.jpg" class = "profilePicture"  id = "PP">`;
      const parentTwo = document.getElementById('sign');
      parentTwo.innerHTML = `<br>
        <input placeholder="Login" id = "Log" class = "forLog"> </input>
        <input placeholder="Password" id = "Pas" class = "forPas"> </input>`;
    }
  }
}
