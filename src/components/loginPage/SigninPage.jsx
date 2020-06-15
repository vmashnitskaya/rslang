import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import Form from './Form';
import authorization from './authorization';
import Message from './Message';

const SigninPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const onSignIn = async (email, password) => {
        const user = {
            email: `${email}`,
            password: `${password}`,
        };
        try {
            const loginInfo = await authorization.loginUser(user);
            if (typeof loginInfo === 'object') {
                setInfoMessage('User signed in');
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
            <Typography align="center" variant="h3" color="primary">
                RS Lang
            </Typography>
            <div className="link-to-sign-up">
                <Typography align="center" color="primary">
                    Do not have an account?
                </Typography>
                <Box align="center" color="secondary">
                    <Link to="/sign-up" className="sign-up">
                        Sign up
                    </Link>
                </Box>
            </div>
            <Form
                className="form"
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

SigninPage.propTypes = {};

export default SigninPage;
