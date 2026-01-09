import { useNavigate } from "react-router-dom";
import { useNotifications } from "../NotificationContext";
import "./NotificationItem.css";

export default function NotificationItem({ notification, onClose }) {
  const navigate = useNavigate();
  const { markNotificationAsRead } = useNotifications();

  const handleClick = async () => {
    // Mark as read if not already read
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
    }

    // Navigate to the appropriate page based on notification type
    if (notification.link_url) {
      navigate(notification.link_url);
      onClose();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment_update":
        return "📅";
      case "prescription":
        return "💊";
      case "message":
        return "✉️";
      case "document_upload":
        return "📄";
      case "appointment_reminder":
        return "⏰";
      default:
        return "🔔";
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div
      className={`notification-item ${!notification.is_read ? "unread" : ""}`}
      onClick={handleClick}
    >
      <div className="notification-icon">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="notification-content">
        <div className="notification-title">{notification.title}</div>
        <div className="notification-message">{notification.message}</div>
        <div className="notification-time">
          {formatTime(notification.created_at)}
        </div>
      </div>
      {!notification.is_read && <div className="notification-badge"></div>}
    </div>
  );
}
