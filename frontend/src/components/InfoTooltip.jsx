import RegisterOk from "../images/RegisterOk.jpg";
import RegisterCancel from '../images/RegisterCancel.jpg';
import Popup from "./Popup";

export default function InfoTooltip({ isOpen, registerStatus, onClose }) {

    return (
        <Popup isOpen={isOpen} name="infotooltip" onClose={onClose} >
            <img className="popup__infotooltip-img" src={registerStatus.status ? RegisterOk : RegisterCancel} alt={registerStatus ? 'ок'
                : 'ошибка'} />
            <h2 className="popup__infotooltip-title">{registerStatus.title}</h2>
        </Popup>
    )
}