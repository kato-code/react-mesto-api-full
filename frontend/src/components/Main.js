import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div 
                    className="profile__avatar-container" 
                    onClick={onEditAvatar}>
                    <img 
                        className="profile__avatar" 
                        src={currentUser.avatar} 
                        alt="Аватар" 
                    />
                </div>
                <div className="profile__content">
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                    <button 
                        type="button" 
                        className="button button_type_edit-profile" 
                        onClick={onEditProfile} 
                    />
                </div>
                <button 
                    type="button" 
                    className="button button_type_add-gallery" 
                    onClick={onAddPlace} 
                />
            </section>

            <section className="gallery">
                <ul className="cards">
                    {cards.map((card) => (
                        <Card 
                            key={card._id}
                            card={card} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                        )
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main