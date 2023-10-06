import Popup from "./Popup"

export default function ImagePopup({ card, isOpen, onClose }) {

    return (
        <Popup isOpen={isOpen} name="image" onClose={onClose}>
            <figure className="popup__figure">
                <img className="popup__image" src={card?.link} alt={card?.name} />
                <figcaption className="popup__caption">{card?.name}</figcaption>
            </figure>
        </Popup>
    )
}