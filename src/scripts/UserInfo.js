export default class UserInfo {
  constructor({ profileName, profileInformation }) {
    this._userNameElement = document.querySelector(profileName);
    this._userDescriptionElement = document.querySelector(profileInformation);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent
    }
  }

  setUserInfo({ userName, userDescription }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}