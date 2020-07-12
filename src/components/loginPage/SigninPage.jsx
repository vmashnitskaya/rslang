import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import Message from './Message';
import action from '../router/storage/actions';
import LoginPhrase from './LoginPhrase';
import MinigamesSection from './MinigamesSection';
import AboutUsSection from './AboutUsSection';
import IntervalSection from './IntervalSection';
import SettingsSection from './SettingsSection';
import { getLogInMessage, getLogInError } from '../router/storage/selectors';

const useStyles = makeStyles({
    logo: {
        position: 'absolute',
        fontWeight: 600,
        left: '70px',
        top: '30px',
    },
    formText: {
        fontSize: '18px',
    },
});

const SigninPage = () => {
    const classes = useStyles();
    const errorMessage = useSelector(getLogInError);
    const infoMessage = useSelector(getLogInMessage);
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('authData'));
        if (data && data.token) {
            dispatch(action.token.set(data.token));
            dispatch(action.userId.set(data.userId));
        }
    });

    const onSignIn = async (email, password) => {
        await dispatch(action.user.logIn(email, password));
    };
    const onFormError = (text) => {
        dispatch(action.user.logInError(text));
    };
    return (
        <div className="login-container">
            <section className="signin-page">
                <Typography align="center" variant="h4" color="primary" className={classes.logo}>
                    RS Lang
                </Typography>
                <LoginPhrase />
                <div className="link-to-sign-up">
                    <Typography align="center" color="primary" className={classes.formText}>
                        Do not have an account?
                    </Typography>
                    <Box align="center" color="secondary">
                        <Link to="/sign-up" className="sign-up">
                            Sign up
                        </Link>
                    </Box>
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
            </section>
            <AboutUsSection />
            <MinigamesSection />
            <IntervalSection />
            <SettingsSection />
        </div>
    );
};

SigninPage.propTypes = {};

export default SigninPage;
