const words = (state) => state.savannah.words;
const gameState = (state) => state.savannah.gameState;
const gameSettings = (state) => state.savannah.gameSettings;
const gamePlan = (state) => state.savannah.gamePlan;
const gameResults = (state) => state.savannah.gameResults;
const message = (state) => state.savannah.message;

export default {
    words,
    gameState,
    gameSettings,
    gamePlan,
    gameResults,
    message,
};
