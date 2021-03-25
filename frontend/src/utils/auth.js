export const BASE_URL = 'http://api.project.mesto.nomoredomains.icu';

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
            if(res.ok) {
                return res.json();
            } 

            return Promise.reject(`Ошибка: ${res.status}`)
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
            if(res.ok) {
                return res.json();
            } 

            return Promise.reject(`Ошибка: ${res.status}`)
        });
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
            if(res.ok) {
                return res.json();
            } 

            return Promise.reject(`Ошибка: ${res.status}`)
        });
};



