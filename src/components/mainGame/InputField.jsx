import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';
import mainGameActions from './redux/mainGameActions';
import './InputField.scss';

const useStyles = makeStyles(() => ({
    root: {
        padding: 5,
        marginBottom: 15,
        fontSize: 24,
    },
    inputRoot: {
        fontSize: 24,
        marginTop: 1,
    },
    input: {
        paddingTop: 10,
    },
}));

const InputField = ({
    word,
    onGuessedWordProvided,
    isPlaceHolderShown,
    wordStatus,
    setInitialState,
    isCorrectPlaceholderShown,
}) => {
    const [guessedWord, setGuessedWord] = useState('');
    const [isIncorrectStatusShown, setIsIncorrectStatusShown] = useState(false);
    const [isCorrectStatusShown, setIsCorrectStatusShown] = useState(false);
    const classes = useStyles();
    const wordWidth = word.length ? word.length * 17 : 200;

    useEffect(() => {
        setIsIncorrectStatusShown(false);
        setIsCorrectStatusShown(false);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        onGuessedWordProvided(guessedWord);
        event.target.reset();
    };

    const handleInputChanged = (event) => {
        setGuessedWord(event.target.value);
        setInitialState('true');
    };

    useEffect(() => {
        if (isPlaceHolderShown) {
            setIsIncorrectStatusShown(true);
        }
    }, [isPlaceHolderShown]);

    useEffect(() => {
        if (isCorrectPlaceholderShown) {
            setIsCorrectStatusShown(true);
        }
    }, [isCorrectPlaceholderShown]);

    useEffect(() => {
        setTimeout(() => {
            setIsIncorrectStatusShown(false);
        }, 3000);
    }, [isIncorrectStatusShown]);

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
                position: 'relative',
            }}
            onSubmit={onSubmit}
        >
            <TextField
                classes={{ root: classes.root }}
                style={{
                    width: `${wordWidth}px`,
                }}
                name="guessedWord"
                autoComplete="false"
                variant="filled"
                placeholder={isPlaceHolderShown && word}
                InputProps={{ classes: { root: classes.inputRoot, input: classes.input } }}
                onChange={handleInputChanged}
                disabled={isCorrectStatusShown}
            />
            <span
                className={clsx(
                    'correct-answer-hidden',
                    isIncorrectStatusShown && 'show',
                    isCorrectStatusShown && 'show'
                )}
            >
                {isIncorrectStatusShown &&
                    word &&
                    wordStatus.incorrectWord &&
                    word.split('').map((element, index) => {
                        return (
                            <span
                                className={clsx(
                                    'green-status',
                                    element !== wordStatus.incorrectWord[index] && 'red-status'
                                )}
                            >
                                {element}
                            </span>
                        );
                    })}
                {isCorrectStatusShown && word && <span className="correct-answer">{word}</span>}
            </span>
            <IconButton variant="contained" color="primary" type="submit">
                <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
        </form>
    );
};

InputField.propTypes = {
    word: PropTypes.string.isRequired,
    onGuessedWordProvided: PropTypes.func.isRequired,
    isPlaceHolderShown: PropTypes.bool.isRequired,
    wordStatus: PropTypes.objectOf(PropTypes.string).isRequired,
    setInitialState: PropTypes.func.isRequired,
    isCorrectPlaceholderShown: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setInitialState: (initialState) => {
        dispatch(mainGameActions.setInitialState(initialState));
    },
});

export default connect(null, mapDispatchToProps)(InputField);
