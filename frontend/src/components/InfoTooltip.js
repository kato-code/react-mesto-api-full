// function InfoTooltip({ isOpen, onClick, onClose, infoTooltip }) {
//     return (
//         <section className={`popup popup_type_tooltip ${isOpen ? "popup_is-opened" : ""}`} onClick={onClick}>
//             <div className="popup__form popup__form_type_tooltip">
//                 <button 
//                     type="button" 
//                     className="button button_type_close-popup"
//                     onClick={onClose}
//                 />
//                 <img 
//                     className="popup__image-tooltip" 
//                     alt="стикер" 
//                     src={infoTooltip ? infoTooltip.src : ""}
//                 />
//                 <p className="popup__text-tooltip"> 
//                     {infoTooltip ? infoTooltip.text : ""} 
//                 </p>
//             </div>
//         </section>
//     )
// };
import succesImg from "../images/success.svg";
import errorImg from "../images/error.svg";

function InfoTooltip({ isOpen, onClick, onClose, infoTooltip }) {
    return (
        <section className={`popup popup_type_tooltip ${isOpen ? "popup_is-opened" : ""}`} onClick={onClick}>
            <div className="popup__form popup__form_type_tooltip">
                <button 
                    type="button" 
                    className="button button_type_close-popup"
                    onClick={onClose}
                />
                <img 
                    className="popup__image-tooltip" 
                    alt="стикер" 
                    src={`${infoTooltip ? succesImg : errorImg}`}
                />
                <p className="popup__text-tooltip"> 
                    {`${infoTooltip ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`} 
                </p>
            </div>
        </section>
    )
};

export default InfoTooltip;