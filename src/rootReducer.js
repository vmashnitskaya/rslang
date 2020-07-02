import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import navigation from './components/router/storage/reducer';
import vocabulary from './components/vocabulary/redux/vocabularyReducer';
import settings from './components/router/storage/getSettingsRedux/settingsReducer';
import words from './components/router/storage/getWordsRedux/wordsReducer';
import mainGame from './components/mainGame/redux/mainGameReducer';
import statistics from './components/router/storage/getPutStatisticsRedux/statisticsReducer';
import aggregatedWords from './components/router/storage/getAggregatedWordsRedux/aggregatedWordsReducer';

const reducer = combineReducers({
    navigation,
    vocabulary,
    settings,
    words,
    mainGame,
    statistics,
    aggregatedWords,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
