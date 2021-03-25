import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onClick, onCardDelete, card}) {
    function handleCardDelete(evt) {
        evt.preventDefault()
        onCardDelete(card)
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onClick={onClick}
            onSubmit={handleCardDelete}
            title="Вы уверены?"
            captionButton="Да"
            popupName="confirm"
            formName="confirm"
        />
    )
}

export default ConfirmPopup