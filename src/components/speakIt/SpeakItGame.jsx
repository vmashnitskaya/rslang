import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Snackbar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import Image from './Image';
import Translation from './Translation';
import SpeechRecognitionText from './SpeechRecognitionText';
import Loading from './Loading';
import createSpeechRecognition from './createSpeechRecognition';
import ResultsPopUp from './ResultsPopUp';
import StartPage from './StartPage';
import startImage from '../../../public/assets/images/start-image.jpg';
import './SpeakItGame.scss';
import wordsActions from '../router/storage/getWordsRedux/wordsActions';
import wordsSelectors from '../router/storage/getWordsRedux/wordsSelectors';
import { getToken, getUserId } from '../router/storage/selectors';
import speakItActions from './redux/speakItActions';
import speakItSelectors from './redux/speakItSelectors';
import Alert from './Alert';
import aggregatedWordsActions from '../router/storage/getAggregatedWordsRedux/aggregatedWordsActions';
import aggregatedWordsSelectors from '../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';

const filterForRepeatWords = {
    $or: [
        {
            $and: [
                {
                    'userWord.optional.difficult': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
        {
            $and: [
                {
                    'userWord.optional.repeat': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
        {
            $and: [
                {
                    'userWord.optional.learned': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
    ],
};

const useStyles = makeStyles((theme) => ({
    rootRadio: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: '-27px',
    },
    rootRadioOption: {
        display: 'none',
    },
    label: {
        color: theme.palette.primary.main,
    },
}));

const SpeakItGame = ({
    words,
    loading,
    error,
    fetchWords,
    complexity,
    cards,
    selectedCard,
    gameStarted,
    speechText,
    guessedWords,
    isPopUpOpened,
    setCards,
    setComplexity,
    setGameStarted,
    setGuessedWords,
    setPopUpOpened,
    setSelectedCard,
    setSpeechText,
    addGuessedWord,
    isGameStarted,
    setIsGameStarted,
    userId,
    token,
    aggregatedWords,
    loadingAggr,
    errorAggr,
    fetchAggregatedWords,
    setInitialState,
}) => {
    const speechRecognitionRef = useRef();
    const [wordsType, setWordsType] = useState('new');
    const [alertShown, setAlertShown] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        setInitialState();
    }, []);

    useEffect(() => {
        if (userId && token && wordsType === 'repeat') {
            fetchAggregatedWords(userId, token, 20, filterForRepeatWords);
        } else {
            const page = Math.round(Math.random() * 29);
            fetchWords(page, complexity);
        }
    }, [wordsType, fetchAggregatedWords, fetchWords]);

    const loadCards = useCallback(async (complexityNumber) => {
        const page = Math.round(Math.random() * 29);
        await fetchWords(page, complexityNumber);
    }, []);

    useEffect(() => {
        setSelectedCard(null);
        setGuessedWords([]);
        if (wordsType === 'repeat' && aggregatedWords.length && aggregatedWords.length > 10) {
            setCards(
                aggregatedWords
                    .slice(0, 10)
                    .map(({ word, audio, wordTranslate, image, transcription }) => ({
                        word: word.toLowerCase(),
                        audio,
                        translation: wordTranslate,
                        image,
                        transcription,
                    }))
                    .sort(() => Math.random() - 0.5)
            );
            setSelectedCard(null);
        } else if (
            wordsType === 'repeat' &&
            aggregatedWords.length &&
            aggregatedWords.length < 10
        ) {
            setWordsType('new');
            setAlertShown(true);
        } else if (words) {
            setCards(
                words
                    .slice(0, 10)
                    .map(({ word, audio, wordTranslate, image, transcription }) => ({
                        word: word.toLowerCase(),
                        audio,
                        translation: wordTranslate,
                        image,
                        transcription,
                    }))
                    .sort(() => Math.random() - 0.5)
            );
        }
    }, [words, aggregatedWords]);

    const handleComplexityChange = (newComplexity) => {
        setComplexity(newComplexity);
    };

    const handleCardSelected = (card) => {
        setSelectedCard(card);
    };

    const handleSpeechText = useCallback(
        (text) => {
            setSpeechText(text);
            const guessedCard = cards.find(({ word }) => word === text);
            if (guessedCard) {
                if (!guessedWords.includes(guessedCard.word)) {
                    addGuessedWord(guessedCard.word);
                }
                setSelectedCard(guessedCard);
            }
        },
        [cards, guessedWords]
    );

    const handleStartGame = () => {
        setGameStarted(true);
        if (!guessedWords.length) {
            setSelectedCard(null);
        }
        setSpeechText('');
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            if (speechRecognition.isStarted()) {
                speechRecognition.abort();
            } else if (!speechRecognition.isStarted()) {
                speechRecognition.start(handleSpeechText);
            }
        }
    };

    const handleGamePause = () => {
        setGameStarted(false);
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            if (speechRecognition.isStarted()) {
                speechRecognition.abort();
            }
        }
    };

    useEffect(() => {
        if (cards.length) {
            setGuessedWords([]);
        }
    }, [cards]);

    const handlePopUpOpened = useCallback(() => {
        setPopUpOpened(true);
        handleGamePause();
    }, [handleGamePause]);

    const handlePopUpClose = () => {
        setPopUpOpened(false);
    };

    const handleNewGame = () => {
        setGuessedWords([]);
        loadCards(complexity);
        handlePopUpClose();
    };

    useEffect(() => {
        setGuessedWords([]);
        loadCards(complexity);
    }, [complexity, loadCards]);

    useEffect(() => {
        const cardsWords = cards.slice(0).map((card) => card.word);
        speechRecognitionRef.current = createSpeechRecognition(cardsWords);
        return () => {
            setSpeechText(undefined);
            setGameStarted(false);
            if (speechRecognitionRef.current) speechRecognitionRef.current.abort();
        };
    }, [cards]);

    useEffect(() => {
        if (guessedWords.length === 10) {
            handlePopUpOpened();
        }
    }, [guessedWords, handlePopUpOpened]);

    const gandleGameStarted = () => {
        setIsGameStarted(!isGameStarted);
    };

    const handleRadioChange = (event) => {
        if (wordsType && wordsType !== event.target.value) {
            setWordsType(event.target.value);
            setCards([]);
        }
    };
    const handleAlertClose = () => {
        setAlertShown(false);
    };

    return !isGameStarted ? (
        <StartPage onStart={gandleGameStarted} />
    ) : (
        <div className="game-page">
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="words"
                    name="words"
                    value={wordsType}
                    onChange={handleRadioChange}
                    className={classes.rootRadio}
                >
                    <FormControlLabel
                        value="new"
                        control={<Radio className={classes.rootRadioOption} />}
                        label="New"
                        labelPlacement="top"
                        className={wordsType === 'new' ? classes.label : undefined}
                    />
                    <FormControlLabel
                        value="repeat"
                        control={<Radio className={classes.rootRadioOption} />}
                        label="Repeat words"
                        labelPlacement="top"
                        className={wordsType === 'repeat' ? classes.label : undefined}
                    />
                </RadioGroup>
            </FormControl>
            <ComplexityPoints
                currentComplexity={complexity}
                onComplexityChange={handleComplexityChange}
                complexityArray={[0, 1, 2, 3, 4, 5]}
                wordsType={wordsType}
            />
            {selectedCard ? (
                <Image image={selectedCard.image} word={selectedCard.word} />
            ) : (
                <Image image={startImage} />
            )}
            {gameStarted ? (
                <SpeechRecognitionText text={speechText} />
            ) : (
                <Translation translation={selectedCard ? selectedCard.translation : undefined} />
            )}

            {loading || error || loadingAggr || errorAggr ? (
                <Loading error={error} errorAggr={errorAggr} />
            ) : (
                <CardsList
                    cards={cards}
                    selectedCard={selectedCard}
                    gameStarted={gameStarted}
                    guessedWords={guessedWords}
                    onCardSelected={handleCardSelected}
                />
            )}

            <div className="buttons">
                {gameStarted ? (
                    <Button
                        className="stop"
                        variant="contained"
                        color="primary"
                        onClick={handleGamePause}
                        size="small"
                    >
                        Pause game
                    </Button>
                ) : (
                    <Button
                        className="speak"
                        color="primary"
                        variant="contained"
                        onClick={handleStartGame}
                        size="small"
                    >
                        Speak it
                    </Button>
                )}

                <Button
                    className="finish"
                    variant="contained"
                    color="primary"
                    onClick={handlePopUpOpened}
                    size="small"
                >
                    Results
                </Button>
            </div>
            <ResultsPopUp
                open={isPopUpOpened}
                cards={cards}
                guessedWords={guessedWords}
                onClose={handlePopUpClose}
                onNewGame={handleNewGame}
            />
            <Snackbar
                open={Boolean(alertShown)}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                color="primary"
            >
                <Alert
                    onClose={handleAlertClose}
                    alertShown={
                        alertShown ? "No words to repeat. Let's continue with new ones." : ''
                    }
                />
            </Snackbar>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (page, group) => {
        dispatch(wordsActions.fetchWords(page, group));
    },
    setCards: (cards) => {
        dispatch(speakItActions.setCards(cards));
    },
    setComplexity: (complexity) => {
        dispatch(speakItActions.setComplexity(complexity));
    },
    setGameStarted: (isGameStarted) => {
        dispatch(speakItActions.setGameStarted(isGameStarted));
    },
    setGuessedWords: (guessedWords) => {
        dispatch(speakItActions.setGuessedWords(guessedWords));
    },
    setPopUpOpened: (isPopUpOpened) => {
        dispatch(speakItActions.setPopUpOpened(isPopUpOpened));
    },
    setSelectedCard: (card) => {
        dispatch(speakItActions.setSelectedCard(card));
    },
    setSpeechText: (text) => {
        dispatch(speakItActions.setSpeechText(text));
    },
    addGuessedWord: (guessedWord) => {
        dispatch(speakItActions.addGuessedWord(guessedWord));
    },
    setIsGameStarted: (isGameStarted) => {
        dispatch(speakItActions.setIsGameStarted(isGameStarted));
    },
    fetchAggregatedWords: (userId, token, wordsPerDay, filter) => {
        dispatch(aggregatedWordsActions.fetchAggregatedWords(userId, token, wordsPerDay, filter));
    },
    setInitialState: () => {
        dispatch(speakItActions.setInitialState());
    },
});

const mapStateToProps = (state) => ({
    words: wordsSelectors.getWords(state),
    loading: wordsSelectors.getLoading(state),
    error: wordsSelectors.getError(state),
    cards: speakItSelectors.getCards(state),
    complexity: speakItSelectors.getComplexity(state),
    selectedCard: speakItSelectors.getSelectedCard(state),
    gameStarted: speakItSelectors.getGameStarted(state),
    speechText: speakItSelectors.getSpeechText(state),
    guessedWords: speakItSelectors.getGuessedWords(state),
    isPopUpOpened: speakItSelectors.getIsPopUpOpened(state),
    isGameStarted: speakItSelectors.getIsGameStarted(state),
    userId: getUserId(state),
    token: getToken(state),
    aggregatedWords: aggregatedWordsSelectors.getAggregatedWords(state),
    loadingAggr: aggregatedWordsSelectors.getLoading(state),
    errorAggr: aggregatedWordsSelectors.getError(state),
});

SpeakItGame.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    fetchWords: PropTypes.func.isRequired,
    complexity: PropTypes.number.isRequired,
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string,
            id: PropTypes.string,
            audio: PropTypes.string,
            image: PropTypes.string,
            transcription: PropTypes.string,
            wordTranslate: PropTypes.string,
        })
    ),
    selectedCard: PropTypes.objectOf(PropTypes.string),
    gameStarted: PropTypes.bool.isRequired,
    speechText: PropTypes.string,
    guessedWords: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    isPopUpOpened: PropTypes.bool.isRequired,
    setCards: PropTypes.func.isRequired,
    setComplexity: PropTypes.func.isRequired,
    setGameStarted: PropTypes.func.isRequired,
    setGuessedWords: PropTypes.func.isRequired,
    setPopUpOpened: PropTypes.func.isRequired,
    setSelectedCard: PropTypes.func.isRequired,
    setSpeechText: PropTypes.func.isRequired,
    addGuessedWord: PropTypes.func.isRequired,
    isGameStarted: PropTypes.bool.isRequired,
    setIsGameStarted: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    aggregatedWords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            word: PropTypes.string,
            audio: PropTypes.string,
            image: PropTypes.string,
            transcription: PropTypes.string,
            wordTranslate: PropTypes.string,
            userWord: PropTypes.shape({
                difficulty: PropTypes.string,
                optional: PropTypes.shape({
                    learned: PropTypes.bool,
                    difficult: PropTypes.bool,
                    deleted: PropTypes.bool,
                    repeat: PropTypes.bool,
                }),
            }),
        })
    ).isRequired,
    loadingAggr: PropTypes.bool.isRequired,
    errorAggr: PropTypes.bool,
    fetchAggregatedWords: PropTypes.func.isRequired,
    setInitialState: PropTypes.func.isRequired,
};

SpeakItGame.defaultProps = {
    error: false,
    guessedWords: [],
    selectedCard: {},
    speechText: '',
    cards: [],
    errorAggr: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeakItGame);
