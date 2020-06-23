import speakItTypes from './speakItTypes';

const speakItActions = {
    setCards: (cards) => ({
        type: speakItTypes.SET_CARDS,
        payload: cards,
    }),
    setComplexity: (complexity) => ({
        type: speakItTypes.SET_COMPLEXITY,
        payload: complexity,
    }),
    setGameStarted: (isGameStarted) => ({
        type: speakItTypes.SET_GAME_STARTED,
        payload: isGameStarted,
    }),
    setGuessedWords: (guessedWords) => ({
        type: speakItTypes.SET_GUESSED_WORDS,
        payload: guessedWords,
    }),
    setPopUpOpened: (isPopUpOpened) => ({
        type: speakItTypes.SET_IS_POPUP_OPENED,
        payload: isPopUpOpened,
    }),
    setSelectedCard: (card) => ({
        type: speakItTypes.SET_SELECTED_CARD,
        payload: card,
    }),
    setSpeechText: (speechText) => ({
        type: speakItTypes.SET_SPEECH_TEXT,
        payload: speechText,
    }),
    addGuessedWord: (guessedWord) => ({
        type: speakItTypes.ADD_GUESSED_WORD,
        payload: guessedWord,
    }),
    setIsGameStarted: (guessedWord) => ({
        type: speakItTypes.SET_IS_GAME_STARTED,
        payload: guessedWord,
    }),
};

export default speakItActions;
