import { useState } from 'react';
import { markAsRead } from '../../../services/apiNotifications';

export function useMarkAsRead() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const markNotificationAsRead = async (notificationId) => {
        try {
            setLoading(true);
            setError(null);
            await markAsRead(notificationId);
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error marking notification as read:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { markNotificationAsRead, loading, error };
}
