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
            const { data, error: fetchError } = await getUserStatistics({ token, userId });
            setStatistics(data);
            setLoading(false);
            setError(fetchError);
        };
        fetchStatistics();
    }, [userId]);

    return { statistics, error, loading };
};

export default useUserStatistics;
