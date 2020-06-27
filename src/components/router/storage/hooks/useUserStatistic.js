import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken, getUserId } from '../selectors';
import getUserStatistics from '../apiGetters/getUserStatistics';

const useUserStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try {
                const content = await getUserStatistics({ token, userId });
                setStatistics(content);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || `Error loading user statistic`);
            }
        };
        fetchStatistics();
    }, [userId]);

    return { statistics, error, loading };
};

export default useUserStatistics;
