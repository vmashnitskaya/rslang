import React from 'react';
import PropTypes from 'prop-types';
import { AlertTitle, Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import actions from '../storage/actions';

function ErrorHeandler({ message }) {
    console.log(message);
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>
    );
}

const mapDispatchToProps = (dispatch) => ({
    message: () => {
        dispatch(actions.message.set());
    },
});

ErrorHeandler.propTypes = {
    message: PropTypes.func.isRequired,
};

export default connect(mapDispatchToProps)(ErrorHeandler);
