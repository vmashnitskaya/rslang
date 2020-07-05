import types from './types';
import wordsApi from '../../router/storage/getWordsRedux/wordsApi';
import utils from '../utils';

const words = {
    get: (payload) => async (dispatch) => {
        const { userWords, page, group } = payload;
        let correctWords = [];
        try {
            if (!userWords) {
                correctWords = await wordsApi.fetchWords(page, group);
            }
            const usedPages = [];
            let wrongWords = [];
            while (usedPages.length < 3) {
                const pageNumber = Math.round(Math.random() * 29);
                if (
                    (userWords || page !== pageNumber) &&
                    !usedPages.find((e) => e.pageNumber === pageNumber)
                ) {
                    usedPages.push({
                        pageNumber,
                        promise: wordsApi.fetchWords(pageNumber, group),
                    });
                }
            }
            await Promise.all(usedPages.map((e) => e.promise)).then((e) =>
                e.forEach((f) => wrongWords.push(...f))
            );
            wrongWords = utils.shuffle(wrongWords);
            const result = correctWords.map((e, i) => {
                const translations = [
                    {
                        word: e.wordTranslate,
                        correct: true,
                    },
                ];
                for (let y = 0; y < 3; y += 1) {
                    translations.push({
                        word: wrongWords[i * 3 + y].wordTranslate,
                        correct: false,
                    });
                }
                return {
                    id: e.id,
                    word: e.word,
                    translations: utils.shuffle(translations),
                };
            });
            dispatch(words.set(result));
        } catch (e) {
            console.error(e.message);
        }
    },
    set: (payload) => ({ type: types.SET_WORDS, payload }),
    clear: () => ({ type: types.CLEAR_WORDS }),
};

const action = {
    words,
};

export default action;
