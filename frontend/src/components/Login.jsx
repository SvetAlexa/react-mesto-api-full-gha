import React from "react";
import AuthForm from "./AuthForm";

export default function Login({ onLogin }) {

    return (
        <AuthForm onSubmit={onLogin} title="Вход" name="login" buttonText="Войти" />
    )
}