import React from 'react';
import PropTypes from 'prop-types';
import { AlertTitle, Alert } from '@material-ui/lab';

const ErrorHeandler = ({ message }) => (
    <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
    </Alert>
);

ErrorHeandler.defaultProps = {
    message: null,
};

ErrorHeandler.propTypes = {
    message: PropTypes.string,
};

export default ErrorHeandler;
