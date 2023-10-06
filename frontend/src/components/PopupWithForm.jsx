import Popup from "./Popup"

export default function PopupWithForm({ name, title, buttonText, isOpen, isValid, onClose, children, onSubmit }) {

    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <h2 className="popup__title">{title}</h2>
            <form name={`${name}-form`} className="popup__form" noValidate onSubmit={onSubmit}>
                {children}
                <button type="submit" name="submit" value="submit" disabled={isValid}
                    className={`popup__button-sumbit popup__button-sumbit_create ${isValid ? 'popup__button-sumbit_is-invalid' : ''}`}>
                    {buttonText}
                </button>
            </form>
        </Popup>
    )
}