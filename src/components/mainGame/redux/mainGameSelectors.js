const getMainWords = (state) => state.mainGame.mainWords;
const getCurrentWordNumber = (state) => state.mainGame.currentWordNumber;
const getIsAutoSoundEnabled = (state) => state.mainGame.isAutoSoundEnabled;
const getWordStatus = (state) => state.mainGame.wordStatus;

export default {
    getMainWords,
    getCurrentWordNumber,
    getIsAutoSoundEnabled,
    getWordStatus,
};
