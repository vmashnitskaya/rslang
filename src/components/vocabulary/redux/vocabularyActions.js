import vocabularyTypes from './vocabularyTypes';
import passedWordsApi from '../../router/storage/getPostPassedWordsRedux/passedWordsApi';
import { getUserId, getToken } from '../../router/storage/selectors';

const wordsActions = {
    set: (words) => ({
        type: vocabularyTypes.SET_VOCABULARY_WORDS,
        payload: words,
    }),
    deleteById: (id) => ({
        type: vocabularyTypes.DELETE_WORD_BY_ID,
        payload: id,
    }),
};

const deleteWordByType = async (userId, token, word, type) => {
    if (type === 'learned' || type === 'difficult') {
        await passedWordsApi.putPassedWords(userId, token, word._id, {
            difficulty: 'default',
            optional: {
                ...word.userWord.optional,
                [type]: false,
            },
        });
    } else if (word.userWord.optional.deleted) {
        await passedWordsApi.putPassedWords(userId, token, word._id, {
            difficulty: 'default',
            optional: {
                ...word.userWord.optional,
                deleted: false,
            },
        });
    } else if (word.userWord.optional.easy) {
        await passedWordsApi.putPassedWords(userId, token, word._id, {
            difficulty: 'default',
            optional: {
                ...word.userWord.optional,
                easy: false,
            },
        });
    }
};

const updateUserWord = (word, type) => async (dispatch, getState) => {
    const userId = getUserId(getState());
    const token = getToken(getState());

    await deleteWordByType(userId, token, word, type);
    dispatch(wordsActions.deleteById(word._id));
};

export default { wordsActions, updateUserWord };
