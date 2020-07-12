import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import aggregatedWordsActions from '../router/storage/getAggregatedWordsRedux/aggregatedWordsActions';
import aggregatedWordsSelectors from '../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';
import actions from './storage/actions';
import { getToken, getUserId } from '../router/storage/selectors';
import utils from './utils';

function useUserWords() {
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    useEffect(() => {
        const filterForDifficultWords = { 'userWord.optional.learned': true };
        dispatch(
            aggregatedWordsActions.fetchAggregatedWords(userId, token, 500, filterForDifficultWords)
        );
    }, []);
    const isLoading = useSelector(aggregatedWordsSelectors.getLoading);
    const HasError = useSelector(aggregatedWordsSelectors.getError);
    useEffect(() => {
        if (isLoading) {
            dispatch(actions.gameState.set(utils.gameState.LOADING_DATA));
        } else {
            dispatch(actions.gameState.set(utils.gameState.NOT_STARTED));
        }
    }, [isLoading]);

    useEffect(() => {
        if (HasError) {
            dispatch(actions.message.set('Something went wrong. Try again later'));
        }
    }, [HasError]);
}

export default {
    useUserWords,
};
