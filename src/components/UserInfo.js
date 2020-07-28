export default class UserInfo {
  constructor(nameSelector, infoSelector, imageSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userImage = document.querySelector(imageSelector); 
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
  }

  setUserInfo({ name, info }) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }

  setUserAvatar(image) {
    this._userImage.src = image;
  }
}
