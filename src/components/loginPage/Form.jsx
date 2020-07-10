import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@material-ui/core';

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
            <Box display="flex" alignItems="center" flexDirection="column">
                <TextField
                    className={emailClassName}
                    type="text"
                    name={emailClassName}
                    id={emailClassName}
                    margin="normal"
                    onChange={handleEmailInput}
                    variant="outlined"
                    label="Email"
                    required
                />
                <TextField
                    className={passwordClassName}
                    type="password"
                    name={passwordClassName}
                    id={passwordClassName}
                    onChange={handlePasswordInput}
                    variant="outlined"
                    label="Password"
                    margin="normal"
                    required
                />
                <Button
                    variant="contained"
                    className={submitClassName}
                    color="primary"
                    type="submit"
                >
                    {submitText}
                </Button>
            </Box>
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
