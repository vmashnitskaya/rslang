import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import navigation from './components/router/storage/reducer';
import words from './components/router/storage/getWordsRedux/wordsReducer';
import speakIt from './components/speakIt/redux/speakItReducer';

const reducer = combineReducers({
    navigation,
    words,
    speakIt,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
