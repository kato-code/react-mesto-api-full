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

    // получить данные юзера
    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    // получить все карточки
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    // обновить данные юзера
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
    
    // добавить карточку
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

    // удалить карточку
    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    // обработка лайка
    putLike(card, isLiked) {
        return fetch(`${this._url}/cards/likes/${card}`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    // обновить аватар
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
    url: "http://api.project.mesto.nomoredomains.icu",
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
});

export default api