import speakItTypes from './speakItTypes';

const speakItReducer = (
    state = {
        cards: [],
        complexity: 0,
        selectedCard: {},
        gameStarted: false,
        speechText: '',
        guessedWords: [],
        isPopUpOpened: false,
        isGameStarted: false,
    },
    action
) => {
    const { type, payload } = action;

    switch (type) {
        case speakItTypes.SET_CARDS:
            return {
                ...state,
                cards: payload,
            };

        case speakItTypes.SET_COMPLEXITY:
            return {
                ...state,
                complexity: payload,
            };
        case speakItTypes.SET_GAME_STARTED:
            return {
                ...state,
                gameStarted: payload,
            };
        case speakItTypes.SET_SELECTED_CARD:
            return {
                ...state,
                selectedCard: payload,
            };
        case speakItTypes.SET_SPEECH_TEXT:
            return {
                ...state,
                speechText: payload,
            };
        case speakItTypes.ADD_GUESSED_WORD:
            return {
                ...state,
                guessedWords: [...state.guessedWords, payload],
            };
        case speakItTypes.SET_GUESSED_WORDS:
            return {
                ...state,
                guessedWords: payload,
            };
        case speakItTypes.SET_IS_POPUP_OPENED:
            return {
                ...state,
                isPopUpOpened: payload,
            };
        case speakItTypes.SET_IS_GAME_STARTED:
            return {
                ...state,
                isGameStarted: payload,
            };
        default:
            return state;
    }
};

export default speakItReducer;
