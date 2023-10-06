import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({ isOpen, isLoading, card, onClose, onCardDelete }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card)
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены?" buttonText={`${!isLoading ? "Да" : "Удаление..."}`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} >
        </PopupWithForm>
    )
}