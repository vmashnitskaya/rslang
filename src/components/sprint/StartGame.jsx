import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Typography, AppBar, Toolbar, Button, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ComplexityPoints from '../speakIt/ComplexityPoints';
import './StartGame.scss';
import useUserWord from '../router/storage/hooks/useUserWords';
import { getToken } from '../router/storage/selectors';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function StartGame({ onClose, onComplexityChange, onChooseUserWords, complexity }) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);
    const { words, error, loading } = useUserWord();
    const [start, setStart] = useState(true);
    const token = useSelector(getToken);

    const handleClose = () => {
        onClose();
        setOpen(false);
    };

    const handleUserWords = () => {
        if (words.length < 40) {
            setMessage(
                'Your words are not enought for this game. Please go to main game or use random words.'
            );
            setStart(true);
        } else {
            onChooseUserWords(true);
            handleClose();
            setStart(false);
        }
        setShow(false);
    };

    const handleShow = () => {
        setMessage(null);
        setShow(true);
    };

    const handleComplexityChange = (newComplexity) => {
        setStart(false);
        onComplexityChange(newComplexity);
    };

    return (
        <div className="start-page_wrapper">
            {loading && <Loading className="loader" />}
            {error && !!token && <Typography>Something get`s wrong</Typography>}
            <Dialog open={open} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Button
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            Close
                        </Button>
                        <Typography align="center" variant="h6" className={classes.title}>
                            Rules
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box className="start-page_content">
                    <h1 className="start-page_content__name">Sprint</h1>
                    <p className="start-page_content__rules">
                        Determine if the word and translation match in 1 minute
                        <br />
                        You can use already learned or random words.
                    </p>
                    <Box className="start-page_game__variant">
                        <Button
                            className="start-page_game__button"
                            color="primary"
                            variant="contained"
                            onClick={handleUserWords}
                            disabled={!token}
                        >
                            My words
                        </Button>
                        <Button
                            className="start-page_game__button"
                            color="primary"
                            variant="contained"
                            onClick={handleShow}
                        >
                            Random words
                        </Button>
                    </Box>
                </Box>
                {show && (
                    <Box>
                        <Typography align="center" variant="h6">
                            Word complexity
                        </Typography>
                        <ComplexityPoints
                            wordsType="words"
                            currentComplexity={complexity}
                            onComplexityChange={handleComplexityChange}
                            complexityArray={[0, 1, 2, 3, 4, 5]}
                            wordsType=""
                        />
                    </Box>
                )}
                <Typography>{message}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="start-page__button"
                    onClick={handleClose}
                    disabled={start}
                >
                    Start
                </Button>
            </Dialog>
        </div>
    );
}

StartGame.propTypes = {
    onClose: PropTypes.func.isRequired,
    onComplexityChange: PropTypes.func.isRequired,
    onChooseUserWords: PropTypes.func.isRequired,
    complexity: PropTypes.number.isRequired,
};
