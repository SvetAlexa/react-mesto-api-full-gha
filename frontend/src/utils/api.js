import { config } from './utils.js'

class Api {
    constructor(config) {
        this._url = config.url;
    }

    _onResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }

    _request(endpoint, options) {
        this._baseUrl = `${this._url}${endpoint}`
        return fetch(this._baseUrl, options)
            .then(this._onResponse)
    }

    _getTokenLocalStorage() {
        return localStorage.getItem('jwt')
    }


    getUserInfo() {
        const token = this._getTokenLocalStorage();
        return this._request(`/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
    }

    getInitialCards() {
        const token = this._getTokenLocalStorage();
        return this._request(`/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
    }

    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    createNewCard(dataCard) {
        const token = this._getTokenLocalStorage();
        return this._request(`/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify(dataCard)
        })
    }

    removeCard(cardId) {
        const token = this._getTokenLocalStorage();
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
    }

    swapLike(cardId, statusIsLiked) {
        const token = this._getTokenLocalStorage();
        return this._request(`/cards/${cardId}/likes`, {
            method: statusIsLiked ? 'DELETE' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
    }

    setUserInfo(data) {
        const token = this._getTokenLocalStorage();
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify(data)
        })
    }

    setAvatarPhoto(link) {
        const token = this._getTokenLocalStorage();
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify(link)
        })
    }
}

const api = new Api(config);

export default api;