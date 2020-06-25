import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken, getUserId } from '../selectors';
import getUserWords from '../apiGetters/getUserWords';

const useUserWord = () => {
    const [words, setWords] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);

    useEffect(() => {
        const fetchWord = async () => {
            setLoading(true);
            try {
                const content = await getUserWords({ token, userId });
                setWords(content);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || `Error loading user words`);
            }
        };
        fetchWord();
    }, [userId]);

    return { words, error, loading };
};

export default useUserWord;
