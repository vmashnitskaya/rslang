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
            try {
                const content = await getUserSettings({ token, userId });
                setSettings(content);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || `Error loading user settings`);
            }
        };
        fetchSettings();
    }, [userId]);

    return { settings, error, loading };
};

export default useUserSettings;
