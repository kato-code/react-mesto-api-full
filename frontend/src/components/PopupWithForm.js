import React from "react";

function PopupWithForm({ isOpen, onClose, onClick, onSubmit, title, captionButton, popupName, formName, children }) {

    return (
        <section className={`popup popup_type_${popupName} ${isOpen ? "popup_is-opened" : ""}`} onClick={onClick}>
            <form className={`popup__form popup__form_type_${formName}`} onSubmit={onSubmit}>
                <button 
                    type="button" 
                    className={`button button_type_close-popup button_type_close-popup-${popupName}`} 
                    onClick={onClose} 
                />
                <h2 className="popup__title">{title}</h2>
                {children}
                <button 
                    type="submit" 
                    value="Создать" 
                    className={`button button_type_save-popup button_type_save-popup-${popupName}`}>{captionButton}
                </button>
            </form>
        </section>
    )
}

export default PopupWithForm