import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    function handleDataChange(evt) {
        const { name, value } = evt.target
        setData({ ...data, [name]: value });        
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const { email, password } = data;
        onRegister(email, password)        
    }

    return (
        <form className="form" name="register" onSubmit={handleSubmit}>
            <h2 className="form__title">Регистрация</h2>
            <input
                className="form__input"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleDataChange}
                value={data.email || ''}
                required
            />
            <span id="email-error" className="" />

            <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                minLength="5"
                onChange={handleDataChange}
                value={data.password || ''}
                required
            />
            <span id="password-error" className="" />

            <button 
                type="submit"
                className="button button_type_save-form">Зарегистрироваться</button>

            <p className="form__subtitle">Уже зарегистрированы?
                <Link to="/sign-in" className="form__link">Войти</Link>
            </p>
        </form>
    )
};

export default Register