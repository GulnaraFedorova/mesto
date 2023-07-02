export default class UserInfo {
  constructor({ profileName, profileInformation, profileAvatar}) { 
    this._userNameElement = document.querySelector(profileName); 
    this._userDescriptionElement = document.querySelector(profileInformation);
    this._userAvatarElement = document.querySelector(profileAvatar);
  } 

  getUserInfo() { 
    return { 
    name: this._userNameElement.textContent, 
    about: this._userDescriptionElement.textContent, 
    avatar: this._userAvatarElement.src,
    } 
  } 

  setUserInfo({ name, about, avatar }) { 
    this._userNameElement.textContent = name; 
    this._userDescriptionElement.textContent = about; 
    this._userAvatarElement.src = avatar;
  } 
}