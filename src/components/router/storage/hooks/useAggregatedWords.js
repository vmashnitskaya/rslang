import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken, getUserId } from '../selectors';
import getAggregatedWords from '../apiGetters/getAggregatedWords';

const useAggregatedWords = (params) => {
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);
    const { group, filter, wordsPerPage } = params;
    const [groupState] = useState(group);
    const [filterState] = useState(filter);
    const [wordsPerPageState] = useState(wordsPerPage);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const content = await getAggregatedWords({
                    token,
                    userId,
                    group: groupState,
                    filter: filterState,
                    wordsPerPage: wordsPerPageState,
                });
                setData(content);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || `Error loading aggregated words`);
            }
        };
        fetchData();
    }, [userId, token, groupState, filterState, wordsPerPageState]);

    return { data, error, loading };
};

export default useAggregatedWords;
