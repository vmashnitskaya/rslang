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
        if (token && userId) {
            const filterForDifficultWords = { 'userWord.optional.learned': true };
            dispatch(
                aggregatedWordsActions.fetchAggregatedWords(
                    userId,
                    token,
                    500,
                    filterForDifficultWords
                )
            );
        }
    }, []);
    const isLoading = useSelector(aggregatedWordsSelectors.getLoading);
    const hasError = useSelector(aggregatedWordsSelectors.getError);
    useEffect(() => {
        if (token && userId) {
            if (isLoading) {
                dispatch(actions.gameState.set(utils.gameState.LOADING_DATA));
            } else {
                dispatch(actions.gameState.set(utils.gameState.NOT_STARTED));
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (hasError && token && userId) {
            dispatch(actions.message.set('Something went wrong. Try again later'));
        }
    }, [hasError]);
}

export default {
    useUserWords,
};
