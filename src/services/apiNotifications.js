import axiosClient from './axiosClient';

const NOTIFICATION_API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001/api';

// Get all notifications for the current user
export async function getNotifications(userId, userRole) {
    try {
        const response = await fetch(`${NOTIFICATION_API_URL}/notifications/${userId}?role=${userRole}`);
        if (!response.ok) throw new Error('Failed to fetch notifications');
        return await response.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

// Get unread notification count
export async function getUnreadCount(userId, userRole) {
    try {
        const response = await fetch(`${NOTIFICATION_API_URL}/notifications/${userId}/unread-count?role=${userRole}`);
        if (!response.ok) throw new Error('Failed to fetch unread count');
        const data = await response.json();
        return data.unread_count;
    } catch (error) {
        console.error('Error fetching unread count:', error);
        throw error;
    }
}

// Mark notification as read
export async function markAsRead(notificationId) {
    try {
        const response = await fetch(`${NOTIFICATION_API_URL}/notifications/${notificationId}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to mark notification as read');
        return await response.json();
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
}

// Mark all notifications as read
export async function markAllAsRead(userId, userRole) {
    try {
        const response = await fetch(`${NOTIFICATION_API_URL}/notifications/${userId}/read-all?role=${userRole}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to mark all as read');
        return await response.json();
    } catch (error) {
        console.error('Error marking all as read:', error);
        throw error;
    }
}

// Delete a notification
export async function deleteNotification(notificationId) {
    try {
        const response = await fetch(`${NOTIFICATION_API_URL}/notifications/${notificationId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete notification');
        return await response.json();
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}

// Create a new notification (for testing or internal use)
export async function createNotification(notificationData) {
    try {
        const response = await fetch(`${NOTIFICATION_API_URL}/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData),
        });
        if (!response.ok) throw new Error('Failed to create notification');
        return await response.json();
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
}
