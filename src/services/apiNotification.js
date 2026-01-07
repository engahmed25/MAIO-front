import axiosClient from "./axiosClient";

const BASE_PATH = "/api/notifications";

export async function fetchNotifications() {
  const res = await axiosClient.get(`${BASE_PATH}`);
  return res.data?.notifications || [];
}

export async function fetchUnreadCount() {
  const res = await axiosClient.get(`${BASE_PATH}/unread/count`);
  return res.data?.unreadCount ?? 0;
}

export async function markNotificationRead(notificationId) {
  const res = await axiosClient.patch(`${BASE_PATH}/${notificationId}/read`);
  return res.data?.notification;
}

export async function markAllNotificationsRead() {
  const res = await axiosClient.patch(`${BASE_PATH}/read-all`);
  return res.data?.updatedCount ?? 0;
}

export async function deleteNotification(notificationId) {
  const res = await axiosClient.delete(`${BASE_PATH}/${notificationId}`);
  return res.data;
}

export async function sendNotification(payload) {
  const res = await axiosClient.post(`${BASE_PATH}/send`, payload);
  return res.data;
}

export async function broadcastNotification(payload) {
  const res = await axiosClient.post(`${BASE_PATH}/admin/broadcast`, payload);
  return res.data;
}

export async function sendNotificationToRole(payload) {
  const res = await axiosClient.post(`${BASE_PATH}/send-to-role`, payload);
  return res.data;
}
