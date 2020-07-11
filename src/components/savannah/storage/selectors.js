const words = (state) => state.savannah.words;
const gameState = (state) => state.savannah.gameState;
const gameSettings = (state) => state.savannah.gameSettings;
const gamePlan = (state) => state.savannah.gamePlan;
const userHaveWords = (state) =>
    !!(state.vocabulary.words.learned && state.vocabulary.words.learned.length >= 20);
const gameResults = (state) => state.savannah.gameResults;
const message = (state) => state.savannah.message;

export default {
    words,
    gameState,
    gameSettings,
    gamePlan,
    userHaveWords,
    gameResults,
    message,
};
