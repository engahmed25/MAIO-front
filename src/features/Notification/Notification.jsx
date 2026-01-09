import React, { useEffect, useRef, useState } from "react";
import { Bell, Loader2, X } from "lucide-react";
import io from "socket.io-client";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "./useNotifications";
import { useUnreadNotificationsCount } from "./useUnreadNotificationsCount";
import { useMarkNotificationRead } from "./useMarkNotificationRead";
import { useMarkAllNotificationsRead } from "./useMarkAllNotificationsRead";
import { useDeleteNotification } from "./useDeleteNotification";
import { notificationKeys } from "./notificationKeys";
import { useMemo } from "react";

const SOCKET_URL =
  (import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:5000").replace(/\/api\/?$/, "");

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
};

const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const Notification = ({ userId: propUserId, role: propRole }) => {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const notificationRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const user = authUser()?.user;
  const token = authHeader()?.replace("Bearer ", "");
  const decoded = useMemo(() => decodeJwt(token), [token]);

  const userId =
    propUserId ||
    user?._id ||
    user?.id ||
    decoded?.id ||
    decoded?._id;
  const role = propRole || user?.role || decoded?.role;

  const {
    data: notifications = [],
    isLoading: isLoadingNotifications,
  } = useNotifications(!!userId);

  const { data: unreadCountData } = useUnreadNotificationsCount(!!userId);
  const unreadCount =
    unreadCountData ?? notifications.filter((notification) => !notification.isRead).length;

  const markReadMutation = useMarkNotificationRead();
  const markAllMutation = useMarkAllNotificationsRead();
  const deleteMutation = useDeleteNotification();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!userId) return undefined;

    const browserNotification = typeof window !== "undefined" ? window.Notification : null;
    if (browserNotification && browserNotification.permission === "default") {
      browserNotification.requestPermission();
    }

    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: token ? { token } : undefined,
    });

    socketInstance.on("connect", () => {
      const normalizedRole =
        role === "doctor" ? "Doctor" : role === "patient" ? "Patient" : role;
      if (userId) {
        socketInstance.emit("register", { userId, role: normalizedRole });
      }
    });

    socketInstance.on("notification", (data) => {
      const browserNotificationInstance =
        typeof window !== "undefined" ? window.Notification : null;

      if (browserNotificationInstance?.permission === "granted" && data?.message) {
        new browserNotificationInstance("MAIO Notification", {
          body: data.message,
          icon: "/favicon.ico",
        });
      }

      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Notification socket connection error:", error);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [userId, role, token, queryClient]);

  const handleMarkAsRead = (notificationId, alreadyRead) => {
    if (!notificationId || alreadyRead) return;
    markReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    if (!notifications.length) return;
    markAllMutation.mutate();
  };

  const handleDelete = (notificationId) => {
    if (!notificationId) return;
    deleteMutation.mutate(notificationId);
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[32rem] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-800 text-lg">Notifications</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                Refresh
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={markAllMutation.isPending}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium disabled:opacity-60"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {isLoadingNotifications ? (
              <div className="p-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading notifications...
              </div>
            ) : !userId ? (
              <div className="p-8 text-center text-sm text-gray-500">
                Please sign in to view notifications.
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No notifications</p>
              </div>
            ) : (
              <div>
                {notifications.map((notif) => {
                  const isUnread = notif?.isRead === false;
                  const alreadyRead = notif?.isRead === true;
                  return (
                    <div
                      key={notif._id || notif.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                        isUnread ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                      onClick={() => handleMarkAsRead(notif._id || notif.id, alreadyRead)}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            {isUnread && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-800 leading-relaxed">
                                  {notif.message}
                                </p>
                                {notif.type && (
                                  <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                    {notif.type}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimestamp(notif.createdAt) || "Just now"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notif._id || notif.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-200 flex-shrink-0"
                          aria-label="Delete notification"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
