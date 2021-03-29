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
                about: data.about
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
        return fetch(`${this._url}/cards/${card}/likes`, {
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
    url: "https://api.project.mesto.nomoredomains.icu",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    }
});

export default api