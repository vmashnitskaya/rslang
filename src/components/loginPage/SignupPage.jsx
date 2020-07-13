import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import Message from './Message';
import LoginPhrase from './LoginPhrase';
import MinigamesSection from './MinigamesSection';
import AboutUsSection from './AboutUsSection';
import IntervalSection from './IntervalSection';
import SettingsSection from './SettingsSection';
import { getCreateUserSuccess, getErrorMessage } from '../router/storage/selectors';
import action from '../router/storage/actions';
import './loginPage.scss';

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

const SignupPage = () => {
    const classes = useStyles();
    const infoMessage = useSelector(getCreateUserSuccess);
    const errorMessage = useSelector(getErrorMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector('form').reset();
    }, [infoMessage]);

    const history = useHistory();
    const onSignUp = async (email, password) => {
        const user = {
            email: `${email}`,
            password: `${password}`,
        };
        await dispatch(action.user.create(user));
    };

    useEffect(() => {
        if (infoMessage) {
            history.push('/');
        }
    }, [infoMessage, errorMessage]);
    return (
        <div className="login-container">
            <section className="signin-page">
                <Typography align="center" variant="h4" color="primary" className={classes.logo}>
                    RS Lang
                </Typography>
                <LoginPhrase />
                <div className="link-to-sign-up">
                    <Typography color="primary" align="center" className={classes.formText}>
                        Have an acount?
                    </Typography>
                    <Box align="center" color="secondary">
                        <Link to="/" className="sign-in">
                            Sign in
                        </Link>
                    </Box>
                    <Form
                        className="form"
                        emailClassName="sign-in"
                        passwordClassName="password-for-sign-in"
                        submitClassName="submit"
                        submitText="Sign up"
                        onSubmit={onSignUp}
                        onError={(error) => dispatch(action.user.createError(error))}
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

SignupPage.propTypes = {};

export default SignupPage;
