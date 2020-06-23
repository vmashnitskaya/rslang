import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import authorization from '../authorization';
import Message from './Message';

const SigninPage = ({ onLogIn }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const history = useHistory();

    const onSignIn = async (email, password) => {
        const user = {
            email: `${email}`,
            password: `${password}`,
        };
        try {
            const loginInfo = await authorization.loginUser(user);
            if (typeof loginInfo === 'object') {
                history.push('/');
                onLogIn();
            } else {
                setInfoMessage('');
                setErrorMessage('Incorrect e-mail or password');
            }
        } catch (e) {
            setErrorMessage('Something went wrong, please try again later.');
        }
    };
    const onFormError = (text) => {
        setErrorMessage(text);
    };
    return (
        <div className="signin-page">
            <h1>EnglishPuzzle</h1>
            <div className="link-to-sign-up">
                <div>Do not have an account?</div>
                <Link to="/sign-up" className="sign-up">
                    Sign up
                </Link>
            </div>
            <Form
                className="login-form"
                emailClassName="login"
                passwordClassName="password-for-sign-in"
                submitClassName="submit"
                submitText="Sign in"
                onSubmit={onSignIn}
                onError={onFormError}
            />
            {infoMessage && <Message className="info" text={infoMessage} />}
            {errorMessage && <Message className="error" text={errorMessage} />}
        </div>
    );
};

SigninPage.propTypes = {
    onLogIn: PropTypes.func.isRequired,
};

export default SigninPage;
