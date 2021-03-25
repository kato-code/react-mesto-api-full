import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onClick, onUpdateAvatar }) {
    const avatarRef = React.useRef()

    React.useEffect(() => {
        if(isOpen) {
            avatarRef.current.value = ""
        }
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value
        })
      }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onClick={onClick}
            title="Обновить аватар"
            captionButton="Сохранить"
            popupName="avatar"
            formName="avatar"
        >
            <input
                className="popup__subtitle popup__subtitle_type_avatar"
                type="url"
                name="link_avatar"
                id="link-avatar"
                ref={avatarRef}
                placeholder="Ссылка на аватар"
                required
            />
            <span id="avatar-error" className="error" />

        </PopupWithForm>
    )
}

export default EditAvatarPopup