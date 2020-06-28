import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: 5,
        marginBottom: 15,
    },
    inputRoot: {
        fontSize: 24,
        marginTop: 1,
    },
    input: {
        paddingTop: 10,
    },
}));

const InputField = ({ word }) => {
    const classes = useStyles();
    const wordWidth = word.length ? word.length * 15 : 200;

    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form
            className="game-form"
            noValidate
            autoComplete="off"
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            onSubmit={onSubmit}
        >
            <TextField
                classes={{ root: classes.root }}
                name="guessedWord"
                autoComplete="false"
                variant="filled"
                placeholder={word}
                style={{
                    width: `${wordWidth}px`,
                }}
                InputProps={{ classes: { root: classes.inputRoot, input: classes.input } }}
            />
            <IconButton variant="contained" color="primary" type="submit">
                <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
        </form>
    );
};

InputField.propTypes = {
    word: PropTypes.string.isRequired,
};

export default InputField;
