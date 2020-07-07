import types from './types';
import wordsApi from '../../router/storage/getWordsRedux/wordsApi';
import utils from '../utils';
import selectors from './selectors';

const gamePlan = {
    set: (payload) => ({ type: types.SET_GAME_PLAN, payload }),
};

const gameState = {
    set: (payload) => ({ type: types.SET_GAME_STATE, payload }),
};

const words = {
    get: (payload) => async (dispatch, getState) => {
        dispatch(gameState.set(utils.gameState.LOADING_DATA));

        const { userWords, group } = payload;
        const plan = selectors.gamePlan(getState());
        console.log(group);
        const groupPlan = plan.find((e) => e.group === group);
        const page = groupPlan.pages.shift();
        if (!groupPlan.pages.length) {
            groupPlan.pages = utils.createGroupPlan();
        }
        dispatch(gamePlan.set(plan));

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
                        promise: wordsApi.fetchWords(pageNumber, Math.round(Math.random() * 5)),
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

            dispatch(gameState.set(utils.gameState.IN_PROGRESS));
        } catch (e) {
            console.error(e.message);
            dispatch(gameState.set(utils.gameState.NOT_STARTED));
        }
    },
    set: (payload) => ({ type: types.SET_WORDS, payload }),
    clear: () => ({ type: types.CLEAR_WORDS }),
};

const gameSettings = {
    setGroup: (payload) => ({ type: types.SET_GAME_SETTINGS_GROUP, payload }),
    setUserWords: () => ({ type: types.SET_GAME_SETTINGS_USERWORDS }),
};

const action = {
    words,
    gameSettings,
    gamePlan,
    gameState,
};

export default action;
