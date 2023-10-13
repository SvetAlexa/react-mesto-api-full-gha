import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import PageNotFound from "./PageNotFound";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from '../utils/auth';
import * as token from '../utils/token';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState({ isOpen: false, cards: {} });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMain, setIsLoadingMain] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [registerStatus, setRegisterStatus] = useState({ status: false, title: '' });

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const tokenCheck = () => {
    if (token.getToken('jwt')) {
      const jwt = token.getToken('jwt');
      if (jwt) {
        auth.checkToken(jwt)
          .then((dataUser) => {
            if (dataUser) {
              setLoggedIn(true);
              setEmail(dataUser.email);
              navigate("/", { replace: true })
            }
          })
          .catch((err) => {
            console.error(`Произошла ошибка: ${err}`)
          })
      }
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingMain(true)
      api.getAllInfo()
        .then(([userData, cardsArray]) => {
          setCurrentUser(userData);
          setCards(cardsArray);
        })
        .catch((err) => {
          console.error(`Произошла ошибка: ${err}`)
        })
        .finally(() => {
          setIsLoadingMain(false);
        })
    }
  }, [loggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen({ isOpen: true, card: card });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen({ isOpen: false, cards: {} })
    setIsInfoTooltipOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) // определяем, есть ли у карточки лайк, поставленный текущим пользователем
    api.swapLike(card._id, isLiked) // отправляем запрос в API и получаем обновленные данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((item) =>
            item._id === card._id ? newCard : item)
        )
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((item) =>
            item._id !== card._id
          )
        })
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api.setUserInfo(userInfo)
      .then((userInfoUpdated) => {
        setCurrentUser(userInfoUpdated);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }


  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.setAvatarPhoto(avatar)
      .then((userInfoUpdated) => {
        setCurrentUser(userInfoUpdated);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true)
    api.createNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogin(value, setFormValue) {
    const { email, password } = value;
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setFormValue({ username: '', password: '' });
          setLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true });
          api.getUserInfo()
            .then((data) => {
              return setCurrentUser(data);
            })
        }
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
        setIsInfoTooltipOpen(true)
        setRegisterStatus({
          status: false,
          title: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
      })

  }

  function handleRegister(value) {
    const { email, password } = value;
    auth.register(email, password)
      .then(() => {
        navigate('/sign-in', { replace: true });
        setRegisterStatus({
          status: true,
          title: 'Вы успешно зарегистрировались!'
        })
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
        setRegisterStatus({
          status: false,
          title: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
      })
      .finally(() => {
        setIsInfoTooltipOpen(true)
      })
  }

  function handleSignOut() {
    token.removeToken('jwt');
    setEmail('');
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteButton={handleDeleteClick}
              cards={cards}
              loggedIn={loggedIn}
              isLoadingMain={isLoadingMain}
            />
          } />
          <Route path='/sign-up' element={<Register
            onRegister={handleRegister} />} />
          <Route path='/sign-in' element={<Login
            onLogin={handleLogin} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <DeleteCardPopup
        isOpen={isDeletePopupOpen.isOpen}
        isLoading={isLoading}
        card={isDeletePopupOpen.card}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        registerStatus={registerStatus}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;