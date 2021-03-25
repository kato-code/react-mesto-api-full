import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({isOpen, onClose, onClick, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")

    React.useEffect(() => {
        if(isOpen) {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
    }, [currentUser, isOpen])

    function handleInputChangeName(evt) {
        setName(evt.target.value)
    }

    function handleInputChangeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
      
        onUpdateUser({
          name,
          about: description
        })
      }

      return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onClick={onClick}
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            captionButton="Сохранить"
            popupName="profile"
            formName="profile"
        >
            <input
                className="popup__subtitle popup__subtitle_type_profile"
                type="text" 
                name="name" 
                id="name" 
                placeholder="Имя"
                minLength="2" 
                maxLength="40"
                onChange={handleInputChangeName}
                value={name ? name : ""}
                required
            />
            <span id="name-error" className="error" />

            <input
                className="popup__subtitle popup__subtitle_type_profile" 
                type="text" 
                name="profession" 
                id="profession" 
                placeholder="О себе" 
                minLength="2" 
                maxLength="200"
                onChange={handleInputChangeDescription}
                value={description ? description : ""}
                required 
            />
            <span id="profession-error" className="error" />

        </PopupWithForm>
      )
}

export default EditProfilePopup