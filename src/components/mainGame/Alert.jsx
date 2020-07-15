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
            {alertShown === 'deleted' &&
                'The word is added to deleted words. It will not appear again in training.'}
            {alertShown === 'difficult' &&
                'The word is added to difficult words. It will appear again in further trainings.'}
            {alertShown === 'repeat' && 'The word will appear again in this training.'}
            {alertShown === 'easy' &&
                'The word will not be shown again. You can resore it in vacabulary.'}
            {alertShown === 'noWords' && "No words to repeat. Let's continue with new ones."}
        </MuiAlert>
    );
};

Alert.propTypes = {
    onClose: PropTypes.func.isRequired,
    alertShown: PropTypes.string,
};

Alert.defaultProps = {
    alertShown: '',
};

export default Alert;
