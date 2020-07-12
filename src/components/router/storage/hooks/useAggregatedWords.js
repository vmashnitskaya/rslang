import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken, getUserId } from '../selectors';
import getAggregatedWords from '../apiGetters/getAggregatedWords';

const useAggregatedWords = (params) => {
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);
    const { group, filter, wordsPerPage } = params;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const filterEncoded = encodeURIComponent(JSON.stringify(filter));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const content = await getAggregatedWords({
                    token,
                    userId,
                    group,
                    filter: filterEncoded,
                    wordsPerPage,
                });
                setData(content);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || `Error loading aggregated words`);
            }
        };
        fetchData();
    }, [userId, token, filterEncoded, group, wordsPerPage]);

    return { data, error, loading };
};

export default useAggregatedWords;
