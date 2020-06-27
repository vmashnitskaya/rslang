import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import navigation from './components/router/storage/reducer';
import vocabulary from './components/vocabulary/redux/vocabularyReducer';

const reducer = combineReducers({
    navigation,
    vocabulary,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
