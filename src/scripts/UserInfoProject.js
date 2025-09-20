export default class UserInfoProject {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfoProject() {
    return {
      nameSelector: this._nameElement.textContent,
      aboutSelector: this._aboutElement.textContent
    };
  }

  setUserInfoProject({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement.textContent = nameSelector;
    this._aboutElement.textContent = aboutSelector;
    this._avatarElement.src = avatarSelector;
  };
}
