class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    statusResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    updateUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.profession
            })
        })
        .then(this.statusResponse)
    }
    
    addNewPlace(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this.statusResponse)
    }

    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    putLike(card, isLiked) {
        return fetch(`${this._url}/cards/likes/${card}`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    updateUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this.statusResponse)
    }
}

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-18",
    headers: {
        authorization: "ee7d3d7a-088a-4faf-a6a4-125e05d2a819",
        "Content-Type": "application/json"
    }
});

export default api