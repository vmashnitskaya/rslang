import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ComplexityPoints from './ComplexityPoints';
import CardsList from './CardsList';
import Image from './Image';
import Translation from './Translation';
import SpeechRecognitionText from './SpeechRecognitionText';
import Loading from './Loading';
import api from './api';
import createSpeechRecognition from './createSpeechRecognition';
import ResultsPopUp from './ResultsPopUp';
import startImage from '../../../public/assets/images/start-image.jpg';
import './SpeakItGame.scss';

const SpeakItGame = () => {
    const speechRecognitionRef = useRef();
    const [complexity, setComplexity] = useState(0);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [loading, setLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speechText, setSpeechText] = useState();
    const [guessedWords, setGuessedWords] = useState([]);
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);

    const loadCards = useCallback((complexityNumber) => {
        const page = Math.round(Math.random() * 29);
        setLoading(true);
        api.getCards(page, complexityNumber).then((cardsObjects) => {
            setCards(cardsObjects.sort(() => Math.random() - 0.5));
            setSelectedCard(null);
            setLoading(false);
        });
    }, []);

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
                setGuessedWords((prevState) => {
                    if (prevState.includes(guessedCard.word)) {
                        return prevState;
                    }
                    setSelectedCard(guessedCard);
                    return [...prevState, guessedCard.word];
                });
            }
        },
        [cards]
    );

    const handleStartGame = () => {
        setGameStarted(true);
        setSelectedCard(null);
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
        setSelectedCard(null);
        const speechRecognition = speechRecognitionRef.current;
        if (speechRecognition) {
            if (speechRecognition.isStarted()) {
                speechRecognition.abort();
            }
        }
    };

    const handlePopUpOpened = useCallback(() => {
        setIsPopUpOpened(true);
        handleGamePause();
    }, [handleGamePause]);

    const handlePopUpClose = () => {
        setIsPopUpOpened(false);
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

    return (
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

            {loading ? (
                <Loading />
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
                guessedCards={guessedWords}
                onClose={handlePopUpClose}
                onNewGame={handleNewGame}
            />
        </div>
    );
};

export default SpeakItGame;
