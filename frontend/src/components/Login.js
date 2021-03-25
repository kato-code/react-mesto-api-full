import React from 'react';

function Login({ onLogin }) {
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
        onLogin(email, password)        
    }

    return (
        
        <form className="form" name="login" onSubmit={handleSubmit}>
            <h2 className="form__title">Вход</h2>
            <input
                className="form__input"
                type="email"
                name="email"
                id="email"
                value={data.email || ''}
                placeholder="Email"
                minLength="2" 
                maxLength="40"
                onChange={handleDataChange}
                required
            />
            <span id="email-error" className="" />

            <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                value={data.password || ''}
                placeholder="Пароль"
                minLength="2" 
                maxLength="200"
                onChange={handleDataChange}
                required
            />
            <span id="password-error" className="" />

            <button 
                type="submit"
                className="button button_type_save-form">Войти</button>
        </form>
    )
};

export default Login