import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import Form from './Form';
import Message from './Message';
import { getCreateUserSuccess, getErrorMessage } from '../router/storage/selectors';
import action from '../router/storage/actions';

const SignupPage = () => {
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
                onError={(error) => dispatch(action.user.createError(error))}
            />
            {infoMessage && <Message className="info" text={infoMessage} />}
            {errorMessage && <Message className="error" text={errorMessage} />}
        </div>
    );
};

SignupPage.propTypes = {};

export default SignupPage;
