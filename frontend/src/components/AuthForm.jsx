import React from "react";
import { useState } from "react";

export default function AuthForm({ title, name, buttonText, onSubmit, children }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        onSubmit(formValue, setFormValue);
    }

    return (
        <div className="sign">
            <h2 className="sign__title">{title}</h2>
            <form className="sign__form" name={`${name}-form`} noValidate onSubmit={handleSubmit}>
                <ul className="sign__input-list">
                    <li className="sign__input-item">
                        <input className="sign__input" type="email" value={formValue.email} name="email" placeholder="Email"
                            onChange={handleChange} />
                    </li>
                    <li className="sign__input-item">
                        <input className="sign__input" type="password" value={formValue.password} name="password" placeholder="Пароль"
                            onChange={handleChange} />
                    </li>
                </ul>
                <button className="sign__button" type="submit" name="submit">{buttonText}</button>
            </form>
            {children}
        </div>
    )
}