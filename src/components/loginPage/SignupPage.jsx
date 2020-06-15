import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import Form from './Form';
import authorization from './authorization';
import Message from './Message';

const SignupPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        document.querySelector('form').reset();
    }, [infoMessage]);

    const onSignUp = async (email, password) => {
        const user = {
            email: `${email}`,
            password: `${password}`,
        };
        try {
            const loginInfo = await authorization.createUser(user);
            if (typeof loginInfo === 'object') {
                setInfoMessage(
                    `User with e-mail ${loginInfo.email} was succesfully created. Please sign in.`
                );
            } else {
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
            <Typography align="center" variant="h3" color="primary">
                RS Lang
            </Typography>
            <div className="link-to-sign-up">
                <Typography color="primary" align="center">
                    Have an acount?
                </Typography>
                <Box align="center" color="secondary">
                    <Link to="/" className="sign-in">
                        Sign in
                    </Link>
                </Box>
            </div>
            <Form
                className="form"
                emailClassName="sign-in"
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
