import puzzleTypes from './puzzleTypes';

const maxLevel = 5;

const puzzleReducer = (
    state = {
        pagination: { level: 0, option: 0 },
        levelPassed: [],
        optionsPassed: Array.from({ length: maxLevel + 1 }, (_, i) => i).reduce(
            (acc, el) => ({ ...acc, [el]: [] }),
            {}
        ),
        data: [],
        currentLine: 0,
        currentGuessedWords: [],
        guessedArrays: [],
        currentShuffled: { array: [] },
        currentOriginalArray: [],
        soundLink: '',
        differenceIndexes: undefined,
        gameInProgress: true,
        readyForReview: false,
        readyForContinue: false,
        translation: '',
        wrongResult: false,
        options: {
            translationShown: true,
            soundEnabled: true,
            autoSoundEnabled: true,
        },
        correctResultEnabledOptions: false,
        isStartPage: true,
    },
    action
) => {
    const { type, payload } = action;

    switch (type) {
        case puzzleTypes.SET_PAGINATION:
            return {
                ...state,
                pagination: payload,
            };

        case puzzleTypes.SET_LEVEL_PASSED:
            return {
                ...state,
                levelPassed: payload,
            };
        case puzzleTypes.SET_OPTIONS_PASSED:
            return {
                ...state,
                optionsPassed: payload,
            };
        case puzzleTypes.SET_DATA:
            return {
                ...state,
                data: payload,
            };
        case puzzleTypes.SET_CURRENT_LINE:
            return {
                ...state,
                currentLine: payload,
            };
        case puzzleTypes.SET_CURRENT_GUESSED_WORDS:
            return {
                ...state,
                currentGuessedWords: payload,
            };
        case puzzleTypes.SET_GUESSED_ARRAYS:
            return {
                ...state,
                guessedArrays: payload,
            };
        case puzzleTypes.SET_CURRENT_SHUFFLED:
            return {
                ...state,
                currentShuffled: payload,
            };
        case puzzleTypes.SET_CURRENT_ORIGINAL_ARRAY:
            return {
                ...state,
                currentOriginalArray: payload,
            };

        case puzzleTypes.SET_SOUND_LINK:
            return {
                ...state,
                soundLink: payload,
            };
        case puzzleTypes.SET_DIFFERENCE_INDEXES:
            return {
                ...state,
                differenceIndexes: payload,
            };
        case puzzleTypes.SET_GAME_IN_PROGRESS:
            return {
                ...state,
                gameInProgress: payload,
            };

        case puzzleTypes.SET_READY_FOR_REVIEW:
            return {
                ...state,
                readyForReview: payload,
            };
        case puzzleTypes.SET_READY_FOR_CONTINUE:
            return {
                ...state,
                readyForContinue: payload,
            };
        case puzzleTypes.SET_TRANSLATION:
            return {
                ...state,
                translation: payload,
            };

        case puzzleTypes.SET_WRONG_RESULT:
            return {
                ...state,
                wrongResult: payload,
            };
        case puzzleTypes.SET_OPTIONS:
            return {
                ...state,
                options: payload,
            };
        case puzzleTypes.SET_CORRECT_RESULT_ENABLED:
            return {
                ...state,
                correctResultEnabledOptions: payload,
            };
        case puzzleTypes.SET_IS_START_PAGE:
            return {
                ...state,
                isStartPage: payload,
            };
        default:
            return state;
    }
};

export default puzzleReducer;
