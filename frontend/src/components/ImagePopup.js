function ImagePopup({ card, isOpen, onClose, onClick }) {

    return (
        <section className={`popup popup_type_card ${isOpen ? "popup_is-opened" : ""}`} onClick={onClick}>
            <div className="popup__container-card">
                <button 
                    type="button" 
                    id="close-card" 
                    className="button button_type_close-popup button_type_close-popup-card" 
                    onClick={onClose} 
                />
                <img 
                    className="popup__image-card" 
                    src={card ? card.link : ""} 
                    alt={`${card ? card.name : ""}`}
                />
                <h2 className="popup__title popup__title_type_card">{card ? card.name : ""}</h2>
            </div>
        </section>
    )
}

export default ImagePopup