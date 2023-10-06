import { Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import Logo from '../images/logo.svg';

export default function Header({ email, onSignOut }) {

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    function handleBurgerMenuClick() {
        setIsBurgerMenuOpen(true);
    }

    function handleEscButtonClick() {
        setIsBurgerMenuOpen(false);
    }

    function handleSignOut() {
        onSignOut();
        setIsBurgerMenuOpen(false);
    }

    return (
        <header className={` ${isBurgerMenuOpen ? 'header page__container-header header_type_burger' : 'header page__container-header'}`}>
            <img className="header__logo" src={Logo} alt="логотип Место Россия" />
            <Routes>
                <Route path='/sign-up' element={
                    <Link to="/sign-in" className="header__nav">Войти</Link>}
                />
                <Route path='/sign-in' element={
                    <Link to="/sign-up" className="header__nav">Регистрация</Link>}
                />
                <Route path='/' element={
                    <>
                        <div className='nav nav_is_hidden'>
                            <p className='nav__user'>{email}</p>
                            <button className='nav__button-logout' onClick={handleSignOut}>Выйти</button>
                        </div>
                        <div className={`nav ${isBurgerMenuOpen ? 'nav_is-opened' : 'nav_is_closed'}`}>
                            <p className='nav__user'>{email}</p>
                            <button className='nav__button-logout' onClick={handleSignOut}>Выйти</button>
                        </div>
                        {isBurgerMenuOpen ? <button type="button" className="menu-burger__close-button" onClick={handleEscButtonClick}></button>
                            :
                            <div className='menu-burger' onClick={handleBurgerMenuClick}>
                                <span className='menu-burger__line'></span>
                                <span className='menu-burger__line'></span>
                                <span className='menu-burger__line'></span>
                            </div>
                        }
                    </>
                }
                />
            </Routes>
        </header>
    )
}