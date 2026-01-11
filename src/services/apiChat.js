import axios from "./axiosClient";

export const getChatMessages = async (roomId) => {
  const res = await axios.get(`/api/v1/messages/${roomId}`);
  return res.data.messages || [];
};

export const getDoctorDetails = async (doctorId) => {
  const res = await axios.get(`/doctors/${doctorId}`);
  return res.data;
};

export const getPatientDetails = async (patientId) => {
  const res = await axios.get(`/patients/${patientId}`);
  return res.data;
};

export const markMessagesAsSeen = async (roomId, doctorId) => {
  const res = await axios.post("/api/v1/messages/seen", { roomId, doctorId });
  return res.data;
};

export const uploadChatFiles = async (roomId, files, message) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("message", message || "");
  formData.append("roomId", roomId);

  const res = await axios.post("/api/v1/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getOrCreateRoom = async (doctorBId, patientData) => {
  try {
    console.log("API Call - Creating room:", { doctorBId, patientData });

    const res = await axios.post("/api/v1/rooms/create", {
      doctorBId,
      patientData,
    });

    console.log("API Response - Room created:", res.data);
    return res.data;
  } catch (error) {
    console.error("API Error - Create room failed:");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Error Data:", error.response?.data);
    console.error("Full Error:", error);
    throw error;
  }
};

export const getMyRooms = async () => {
  const res = await axios.get("/api/v1/rooms/my-rooms");
  return res.data.rooms || [];
};

// Get unread messages count for a specific room
export const getUnreadMessagesCount = async (roomId) => {
  try {
    const res = await axios.get(`/api/v1/messages/${roomId}/unread-count`);
    return res.data.unreadCount || 0;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
};

// Get all rooms with unread message counts
export const getMyRoomsWithUnreadCounts = async () => {
  try {
    const res = await axios.get("/api/v1/rooms/my-rooms");
    const rooms = res.data.rooms || [];

    // For each room, fetch unread count
    const roomsWithCounts = await Promise.all(
      rooms.map(async (room) => {
        try {
          const unreadRes = await axios.get(`/api/v1/messages/${room._id}/unread-count`);
          return {
            ...room,
            unreadCount: unreadRes.data.unreadCount || 0
          };
        } catch (error) {
          return {
            ...room,
            unreadCount: 0
          };
        }
      })
    );

    return roomsWithCounts;
  } catch (error) {
    console.error("Error fetching rooms with unread counts:", error);
    return [];
  }
};

