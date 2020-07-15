import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: lightBlue[700],
        maxWidth: 450,
        minWidth: 280,
    },
});

const Alert = ({ onClose, alertShown }) => {
    const classes = useStyles();
    return (
        <MuiAlert elevation={6} variant="filled" onClose={onClose} className={classes.root}>
            {alertShown}
        </MuiAlert>
    );
};

Alert.propTypes = {
    onClose: PropTypes.func.isRequired,
    alertShown: PropTypes.string.isRequired,
};

export default Alert;
