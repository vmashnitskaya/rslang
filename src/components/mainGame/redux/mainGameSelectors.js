const getMainWords = (state) => state.mainGame.mainWords;
const getCurrentWordNumber = (state) => state.mainGame.currentWordNumber;
const getIsAutoSoundEnabled = (state) => state.mainGame.isAutoSoundEnabled;
const getWordStatus = (state) => state.mainGame.wordStatus;
const getIsTranslationEnabled = (state) => state.mainGame.isTranslationEnabled;
const getLearnedWordsNumber = (state) => state.mainGame.learnedWordsNumber;

export default {
    getMainWords,
    getCurrentWordNumber,
    getIsAutoSoundEnabled,
    getWordStatus,
    getIsTranslationEnabled,
    getLearnedWordsNumber,
};
