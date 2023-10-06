import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {

    useEffect(() => {
        if (!isOpen) return;

        const closeByEscape = (e) => { // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape) // удаляем обработчик в `clean-up` функции
    }, [isOpen, onClose])

    const handleOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""} `}
            onClick={handleOverlay} >
            <div className={`popup__container popup__container_type_${name}`}>
                <button className='popup__close-button' type='button' onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default Popup;
