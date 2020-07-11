import { combineReducers } from 'redux';
import types from './types';
import utils from '../utils';

const words = (state = null, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_WORDS:
            return payload;
        case types.CLEAR_WORDS:
            return null;
        default:
            return state;
    }
};

const gameSettings = (state = { userWords: false, group: 0 }, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_GAME_SETTINGS_GROUP:
            return { userWords: false, group: payload };
        case types.SET_GAME_SETTINGS_USERWORDS:
            return { userWords: true, group: -1 };
        default:
            return state;
    }
};

const initialGamePlan = (() => {
    const arr = [];
    for (let i = 0; i < 6; i += 1) {
        arr.push({ group: i, pages: utils.createGroupPlan() });
    }
    return arr;
})();

const gamePlan = (state = initialGamePlan, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_GAME_PLAN:
            return payload;
        default:
            return state;
    }
};

const message = (state = null, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_MESSAGE:
            return payload;
        case types.CLEAR_MESSAGE:
            return null;
        default:
            return state;
    }
};

const gameState = (state = utils.gameState.NOT_STARTED, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_GAME_STATE:
            return payload;
        default:
            return state;
    }
};

const gameResults = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_GAME_RESULTS:
            return Array.isArray(payload) ? [...state, ...payload] : [...state, payload];
        case types.CLEAR_GAME_RESULTS:
            return [];
        default:
            return state;
    }
};

const savannah = combineReducers({
    words,
    gameSettings,
    gamePlan,
    gameState,
    gameResults,
    message,
});

export default savannah;
