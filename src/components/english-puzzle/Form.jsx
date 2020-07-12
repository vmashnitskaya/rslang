import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Form = ({
    className,
    emailClassName,
    passwordClassName,
    submitClassName,
    submitText,
    onSubmit,
    onError,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password.length !== 0 && email.length !== 0) {
            const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+-_@$!%*?&#.,]{8,}$/;
            const emailRegExp = /^[0-9a-z-.]+@[0-9a-z-]{2,}.[a-z]{2,}$/i;
            if (passwordRegExp.test(password) && emailRegExp.test(email)) {
                onSubmit(email, password);
            } else {
                onError(
                    'Email/password format is incorrect. Password should contain at least one lower case, upper case, numeric and special symbol'
                );
            }
        }
    };

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };
    return (
        <form autoComplete="off" id={className} className={className} onSubmit={handleSubmit}>
            <label htmlFor={emailClassName}>
                <input
                    className={emailClassName}
                    type="text"
                    name={emailClassName}
                    id={emailClassName}
                    placeholder="Email"
                    onChange={handleEmailInput}
                />
            </label>
            <label htmlFor={passwordClassName}>
                <input
                    className={passwordClassName}
                    type="password"
                    name={passwordClassName}
                    id={passwordClassName}
                    placeholder="Password"
                    onChange={handlePasswordInput}
                />
            </label>
            <input className={submitClassName} type="submit" value={submitText} />
        </form>
    );
};

Form.propTypes = {
    className: PropTypes.string.isRequired,
    emailClassName: PropTypes.string.isRequired,
    passwordClassName: PropTypes.string.isRequired,
    submitClassName: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default Form;
