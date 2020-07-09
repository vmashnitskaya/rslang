const getCards = (state) => state.speakIt.cards;
const getComplexity = (state) => state.speakIt.complexity;
const getSelectedCard = (state) => state.speakIt.selectedCard;
const getGameStarted = (state) => state.speakIt.gameStarted;
const getSpeechText = (state) => state.speakIt.speechText;
const getGuessedWords = (state) => state.speakIt.guessedWords;
const getIsPopUpOpened = (state) => state.speakIt.isPopUpOpened;
const getIsGameStarted = (state) => state.speakIt.isGameStarted;

export default {
    getCards,
    getComplexity,
    getSelectedCard,
    getGameStarted,
    getSpeechText,
    getGuessedWords,
    getIsPopUpOpened,
    getIsGameStarted,
};
