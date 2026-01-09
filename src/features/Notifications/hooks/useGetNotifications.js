import { useState, useEffect } from 'react';
import { getNotifications } from '../../../services/apiNotifications';
import { useAuthUser } from 'react-auth-kit';

export function useGetNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAuthUser();
    const user = auth()?.user;
    if (!user?.id) {
        setLoading(false);
        return;
    }

    async function fetchData() {
        try {
            setLoading(true);
            setError(null);
            const data = await getNotifications(user.id, user.role);
            setNotifications(data.notifications || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    }

    fetchData();
}, [user?.id, user?.role]);

return { notifications, loading, error };
}
