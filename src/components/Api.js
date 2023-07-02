export default class Api {
    constructor({url, headers}){
        this._url = url;
        this._headers = headers;
        this._authorization = headers.authorization;
    }
    //проверка на ошибки
    _checkingResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    //запрос данных с сервера 
    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
            authorization: this._authorization
            }
        })
        .then(this._checkingResponse)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
            authorization: this._authorization
            }
        })
        .then(this._checkingResponse)
    }

    //oбновить данные профиля
    updateProfileInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkingResponse)
    };

    //добавление карточки
    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify( {name, link})
        })
            .then(this._checkingResponse)
        };
        
    //удаление карточки
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkingResponse)
    }
    
    //добавление и удаление лайка
    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkingResponse)
    };
   
    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkingResponse)
    };
    
    //обновить аватар
    updateAvatar(data) { 
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkingResponse)
    }
}
