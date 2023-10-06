import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
import Card from "./Card"
import spinner from "../images/spinner.gif"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDeleteButton, cards, isLoadingMain }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            {isLoadingMain ?
                <main className="main">
                    <div className="spinner">
                        <img className='spinner__img' src={spinner} alt='страница загружается' />
                    </div>
                </main>
                :
                <main className="main">
                    <section className="profile page__container-profile">
                        <div className="profile__container-avatar" onClick={onEditAvatar}>
                            <img className="profile__avatar" src={currentUser.avatar} alt="фотография профиля" />
                            <div className="profile__overlay" >
                                <div className="profile__avatar-edit-icon" ></div>
                            </div>
                        </div>
                        <div className="profile__info">
                            <div className="profile__name-container">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                            </div>
                            <p className="profile__activity">{currentUser.about}</p>
                        </div>
                        <button type="button" className="profile__add-card-button" onClick={onAddPlace}></button>
                    </section>
                    <section className="elements page__container-elements" aria-label="Галерея с фотографиями">
                        <ul className="elements__lists">
                            {cards.map((item) => (
                                <Card
                                    key={item._id}
                                    card={item}
                                    onCardClick={onCardClick}
                                    onCardLike={onCardLike}
                                    onCardDeleteButton={onCardDeleteButton}
                                />
                            ))
                            }
                        </ul>
                    </section>
                </main>
            }
        </>
    )
}
