import { useState, useEffect } from 'react';
import getWords from '../apiGetters/getWords';

const useWords = (group, page) => {
    const [words, setWords] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

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
