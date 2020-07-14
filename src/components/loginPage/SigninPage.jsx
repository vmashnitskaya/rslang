import React from 'react';
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
import { /* getLogInMessage, */ getLogInError } from '../router/storage/selectors';
import './loginPage.scss';

const useStyles = makeStyles((theme) => ({
    formText: {
        fontSize: '18px',
        [theme.breakpoints.up('md')]: {
            fontSize: '16px',
        },
    },
}));

const SigninPage = () => {
    const classes = useStyles();
    const errorMessage = useSelector(getLogInError);
    // const infoMessage = useSelector(getLogInMessage);
    const dispatch = useDispatch();

    const onSignIn = async (email, password) => {
        await dispatch(action.user.logIn(email, password));
    };
    const onFormError = (text) => {
        dispatch(action.user.logInError(text));
    };
    return (
        <div className="login-container">
            <section className="signin-page">
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
                    {/* {infoMessage ? <Message className="info" text={infoMessage} /> : null} */}
                    {errorMessage ? <Message className="error" text={errorMessage} /> : null}
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
