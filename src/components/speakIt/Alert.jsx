import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import purple from '@material-ui/core/colors/purple';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: purple[500],
        maxWidth: 450,
        minWidth: 280,
    },
});

const Alert = ({ onClose, children }) => {
    const classes = useStyles();
    return (
        <MuiAlert elevation={6} variant="filled" onClose={onClose} className={classes.root}>
            {children}
        </MuiAlert>
    );
};

Alert.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
};

export default Alert;
