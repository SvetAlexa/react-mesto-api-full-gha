import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Register({ onRegister }) {

    return (
        <AuthForm onSubmit={onRegister} title="Регистрация" name="register" buttonText="Зарегистрироваться" >
            <div className="sign__redirect-container">
                <p className="sign__redirect-title">Уже зарегистрированы? </p>
                <Link to="/sign-in" className="sign__redirect-link">Войти</Link>
            </div>
        </AuthForm>
    )
}