import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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
import speakItActions from './redux/speakItActions';
import speakItSelectors from './redux/speakItSelectors';

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
}) => {
    const speechRecognitionRef = useRef();

    const loadCards = useCallback(async (complexityNumber) => {
        const page = Math.round(Math.random() * 29);
        await fetchWords(page, complexityNumber);
    }, []);

    useEffect(() => {
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
        setSelectedCard(null);
    }, [words]);

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
        setSelectedCard(null);
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

    const handleStateChange = () => {
        if (loading) {
            return <Loading />;
        }
        if (error) {
            return <div>error</div>;
        }
        return (
            <CardsList
                cards={cards}
                selectedCard={selectedCard}
                gameStarted={gameStarted}
                guessedWords={guessedWords}
                onCardSelected={handleCardSelected}
            />
        );
    };

    const gandleGameStarted = () => {
        setIsGameStarted(!isGameStarted);
    };

    return !isGameStarted ? (
        <StartPage onStart={gandleGameStarted} />
    ) : (
        <div className="game-page">
            <ComplexityPoints
                currentComplexity={complexity}
                onComplexityChange={handleComplexityChange}
                complexityArray={[0, 1, 2, 3, 4, 5]}
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

            {handleStateChange()}

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
});

SpeakItGame.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
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
};

SpeakItGame.defaultProps = {
    error: null,
    guessedWords: [],
    selectedCard: {},
    speechText: '',
    cards: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeakItGame);
