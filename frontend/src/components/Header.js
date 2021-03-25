import React from "react";
import { Route, Link } from "react-router-dom";
import headerLogo from "../images/logo.svg"

function Header({ email, onSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            <div className="header__info">
                <Route exact path="/">
                    <p className="header__email">{email}</p>
                    <Link to="/sign-in" className="header__link header__link_type_logout" onClick={onSignOut}>Выйти</Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </Route>
                <Route exact path="/sign-in">
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </Route>
            </div>
        </header>
    )
}
  
export default Header