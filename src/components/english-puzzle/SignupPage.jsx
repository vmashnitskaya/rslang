import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import authorization from '../authorization';
import Message from './Message';

const SignupPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        document.querySelector('form').reset();
    }, [infoMessage]);

    const onSignUp = async (email, password) => {
        const user = {
            email: `${email}`,
            password: `${password}`,
        };
        try {
            const signUpInfo = await authorization.createUser(user);

            if (typeof signUpInfo === 'object') {
                setErrorMessage('');
                setInfoMessage(
                    `The user with e-mail ${email} was signed up. You are navigating to sign in page.`
                );
            } else {
                setErrorMessage(signUpInfo);
            }
        } catch (e) {
            setErrorMessage(
                'Incorrect e-mail or password. Password should contain at least one upper and lower case symbol, numeric and special symbols.'
            );
        }
    };
    const onFormError = (text) => {
        setErrorMessage(text);
    };

    useEffect(() => {
        if (infoMessage) {
            setTimeout(() => {
                history.push('/');
            }, 2500);
        }
    }, [infoMessage, history]);

    return (
        <div className="signup-page">
            <h1>EnglishPuzzle</h1>
            <div className="link-to-sign-up">
                <div>Have an acount?</div>
                <Link to="/" className="sign-in">
                    Sign in
                </Link>
            </div>
            <Form
                className="login-form"
                emailClassName="login"
                passwordClassName="password-for-sign-in"
                submitClassName="submit"
                submitText="Sign up"
                onSubmit={onSignUp}
                onError={onFormError}
            />
            {infoMessage && <Message className="info" text={infoMessage} />}
            {errorMessage && <Message className="error" text={errorMessage} />}
        </div>
    );
};

SignupPage.propTypes = {};

export default SignupPage;
