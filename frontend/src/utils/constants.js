export const popup = document.querySelector(".popup");
export const popupIsOpened = document.querySelector(".popup_is-opened");
export const closePopupButton = document.querySelector(".button_type_close-popup");
export const cards = document.querySelector(".cards");

export const popupProfile = document.querySelector(".popup_type_profile");
export const openPopupProfileButton = document.querySelector(".button_type_edit-profile");
export const submitPopupProfileButton = document.querySelector("#save-profile")
export const formProfile = document.querySelector("#form-profile");
export const avatarProfile = document.querySelector(".profile__avatar");
export const nameProfile = document.querySelector("#name");
export const professionProfile = document.querySelector("#profession");

export const popupGallery = document.querySelector(".popup_type_gallery");
export const openPopupGalleryButton = document.querySelector(".button_type_add-gallery");
export const submitPopupGalleryButton = document.querySelector("#save-gallery");
export const formGallery = document.querySelector("#form-gallery");
export const nameCard = document.querySelector("#name-card");
export const linkCard = document.querySelector("#link-card");

export const popupCard = document.querySelector(".popup_type_card");

export const popupConfirm = document.querySelector(".popup_type_confirm");
export const submitPopupConfirmButton = document.querySelector("#save-confirm");

export const popupAvatar = document.querySelector(".popup_type_avatar");
export const openPopupAvatarButton = document.querySelector((".profile__avatar-container"));
export const submitPopupAvatarButton = document.querySelector("#save-avatar");
export const formAvatar = document.querySelector("#form-avatar");

export const configValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__subtitle",
    submitButtonSelector: ".button_type_save-popup",
    inactiveButtonClass: "button_type_invalid",
    inputErrorClass: "popup__subtitle_state_invalid"
};

export const configUser = {
    nameProfile: ".profile__name",
    professionProfile: ".profile__profession",
    avatarProfile: ".profile__avatar"
};
