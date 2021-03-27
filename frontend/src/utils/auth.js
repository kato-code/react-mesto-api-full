export const BASE_URL = 'https://project.mesto.nomoredomains.icu';

const statusResponse = (res) => {
    if(res.ok) {
        return res.json();
    } 

    return Promise.reject(`Ошибка: ${res.status}`)
}

// регистрация юзера
export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((res) => {
            statusResponse(res)
        })
};

// авторизация юзера
export function login(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((res) => {
            statusResponse(res)
        })
};

// обработка токена
export function getToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
    })
        .then((res) => {
            statusResponse(res)
        })
};



