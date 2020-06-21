import { useState, useEffect } from 'react';
import getWords from '../apiGetters/getWords';

const useWords = (group, page) => {
    const [words, setWords] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            const { data, error: fetchError } = await getWords(group, page);
            setWords(data);
            setLoading(false);
            setError(fetchError);
        };
        fetchSettings();
    }, [group, page]);

    return { words, error, loading };
};

export default useWords;
