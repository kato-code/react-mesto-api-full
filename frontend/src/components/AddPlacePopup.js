import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onClick, onAddPlace }) {
    const [cardName, setCardName] = React.useState("")
    const [cardLink, setCardLink] = React.useState("")

    React.useEffect(() => {
        if(isOpen) {
            setCardName("")
            setCardLink("")
        }
    }, [isOpen])

    function handleInputChangeCardName(evt) {
        setCardName(evt.target.value)
    }

    function handleInputChangeCardLink(evt) {
        setCardLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
      
        onAddPlace({
          name: cardName,
          link: cardLink
        })
      }


      return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onClick={onClick}
            onSubmit={handleSubmit}
            title="Новое место"
            captionButton="Создать"
            popupName="gallery"
            formName="gallery"
        >
            <input 
                className="popup__subtitle popup__subtitle_type_gallery" 
                type="text" 
                name="name_card" 
                id="name-card" 
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                onChange={handleInputChangeCardName}
                value={cardName}
                required 
            />
            <span id="name-card-error" className="error" />

            <input 
                className="popup__subtitle popup__subtitle_type_gallery" 
                type="url" 
                name="link_card" 
                id="link-card" 
                placeholder="Ссылка на картинку" 
                onChange={handleInputChangeCardLink}
                value={cardLink}
                required 
            />
            <span id="link-card-error" className="error" />

    </PopupWithForm>
      )
}

export default AddPlacePopup