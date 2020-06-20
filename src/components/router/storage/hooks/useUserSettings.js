import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken, getUserId } from '../selectors';
import getUserSettings from '../apiGetters/getUserSettings';

const useUserSettings = () => {
    const [settings, setSettings] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            const { data, error: fetchError } = await getUserSettings({ token, userId });
            setSettings(data);
            setLoading(false);
            setError(fetchError);
        };
        fetchSettings();
    }, [userId]);

    return { settings, error, loading };
};

export default useUserSettings;
