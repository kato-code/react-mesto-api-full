/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Redirect, Switch, useHistory, withRouter } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import api from "../utils/api.js";
import { login, register, getToken } from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
    const history = useHistory();

    //хуки попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

    //хук карточек в полный размер
    const [selectedCard, setSelectedCard] = React.useState(null)

    //хук для установки данных юзера
    const [currentUser, setCurrentUser] = React.useState({})

    //хук карточек
    const [cards, setCards] = React.useState([])

    //хук удаления карточки
    const [deletedCard, setDeletedCard] = React.useState(null)

    //хук состояния авторизации юзера
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('')

    //хук состояния регистрации нового юзера
    const [infoTooltipContent, setInfoTooltipContent] = React.useState(false)


    //получение данных профиля и карточек
    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([UserData, InitialCards]) => {
                setCurrentUser(UserData)
                setCards(InitialCards)
            })
            .catch((error) => console.log(error))
    }, [])

    //проверка токена авторизованных юзеров
    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const token = localStorage.getItem('jwt')

            getToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        setUserEmail(res.email)
                        history.push('/');
                    }
                })
                .catch((error) => console.log(`Ошибка при запросе токена: ${error.message}`))
        }
    }

    //сохранение токена 
    React.useEffect(() => {
        handleTokenCheck();
    }, []);
    
    React.useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }
    }, [loggedIn]);

    //авторизация
    function handleLoginUser(email, password) {
        login(email, password)
            .then((res) => {
                if (res) {
                    setLoggedIn(true)
                    setUserEmail(email)
                    localStorage.setItem('jwt', res.token)
                    history.push('/')
                }
            })
            .catch((error) => {
                console.log(`Ошибка при авторизации: ${error.message}`)
                handleInfoTooltip(false)
            })
    }

    //регистация 
    function handleRegisterUser(email, password) {
        register(email, password)
            .then((res) => {
                if (res) {
                    handleInfoTooltip(true);
                    history.push('/sign-in');
                } 
            })
            .catch((error) => {
                console.log(`Ошибка при регистрации: ${error.message}`)
                handleInfoTooltip(false)
            })
    }

    //выход из приложения и удаление токена
    function handleSignOutUser() {
        localStorage.removeItem('jwt');
        setLoggedIn(false)
        history.push('/sign-in')
    }

    //открытие попапов
    function handleInfoTooltip(res) {
        setIsInfoTooltipPopupOpen(true)
        setInfoTooltipContent(res)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleDeleteClick(card) {
        setIsConfirmPopupOpen(true)
        setDeletedCard(card)
        document.addEventListener("keydown", handleEscClose);
    }

    //закрытие попапа по нажатию в любой зоне страницы
    function handleOverlayClose(evt) {
        if (evt.target.classList.contains("popup_is-opened")) {
            closeAllPopups()
        }
    }

    //закрытие попапа по нажатию на кнопку Escape
    function handleEscClose(evt) {
        if (evt.key === "Escape") {
            closeAllPopups()
        }
    }

    //закрытие попапов по нажатию на кнопку закрытия
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopupOpen(false)
        setIsConfirmPopupOpen(false)
        setIsInfoTooltipPopupOpen(false)

        document.removeEventListener("keydown", handleEscClose);
    }

    //обновить данные профиля
    function handleUpdateProfile(data) {
        api.updateUserData(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data})
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    //обновить аватар
    function handleUpdateAvatar(data) {
        api.updateUserAvatar(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data})
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    //добавить новую карточку
    function handleAddNewCard(card) {
        api.addNewPlace(card)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    //поставить лайк/дизлайк
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id)

        api.putLike(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                setCards(newCards)
            })
            .catch((error) => console.error(error))
    }

    //удалить карточку
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id)
                setCards(newCards)
                setDeletedCard({})
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header email={userEmail} onSignOut={handleSignOutUser} />
                    <Switch>
                        <ProtectedRoute exact path="/" component={Main}
                                loggedIn={loggedIn} 
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeleteClick}
                                cards={cards} />
                        <Route path="/sign-up">
                            <Register onRegister={handleRegisterUser} />
                        </Route>
                        <Route path="/sign-in">
                            <Login onLogin={handleLoginUser} />
                        </Route>
                        <Route path="/">
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                    </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateProfile}
                    onClick={handleOverlayClose}
                    title="Редактировать профиль"
                    captionButton="Сохранить"
                    popupName="profile"
                    formName="profile"
                />

                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddNewCard}
                    onClick={handleOverlayClose}
                    title="Новое место"
                    captionButton="Создать"
                    popupName="gallery"
                    formName="gallery"
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClick={handleOverlayClose}
                    title="Обновить аватар"
                    captionButton="Сохранить"
                    popupName="avatar"
                    formName="avatar"
                />

                <ImagePopup 
                    card={selectedCard} 
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    onClick={handleOverlayClose}
                />
                
                <ConfirmPopup 
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    onClick={handleOverlayClose}
                    card={deletedCard}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    onClick={handleOverlayClose}
                    infoTooltip={infoTooltipContent}
                />
                    
            </div>
        </CurrentUserContext.Provider>
    )
  }
  
  export default withRouter(App);

