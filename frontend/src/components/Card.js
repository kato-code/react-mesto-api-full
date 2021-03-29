import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)

    const isLiked = card.likes.some((i) => i === currentUser._id)
    const cardLikeButtonClassName = (
        `button button_type_like-card ${isLiked ? "button_type_like-card-active" : ""}`
    )

    const isOwn = card.owner !== currentUser._id
    const cardDeleteButtonClassName = (
        `button button_type_trash-card ${isOwn ? "button_type_trash-card-hidden" : ""}`
    )
 
    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card__item">
            <button 
                type="button" 
                className={cardDeleteButtonClassName} 
                onClick={handleDeleteClick}
            />
            <img 
                className="card__image" 
                src={card.link} 
                alt={card.name} 
                onClick={handleClick} 
            />
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div>
                    <button
                        type="button" 
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick} 
                    />
                    <div className="card__counter-likes">{card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card