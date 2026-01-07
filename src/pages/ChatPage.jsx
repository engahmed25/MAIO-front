import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { getDoctorDetails, getPatientDetails } from "../services/apiChat";
import { useMessagesQuery } from "../features/RealTime/useMessagesQuery.js";
import { useChatSocket } from "../features/RealTime/useChatSocket.js";
import { useFileUpload } from "../features/RealTime/useFileUpload.js";
import { useTypingIndicator } from "../features/RealTime/useTypingIndicator.js";
import { chatSocket } from "../features/RealTime/socket.js";
import ChatHeader from "../features/RealTime/ChatHeader.jsx";
import ChatMessageList from "../features/RealTime/ChatMessageList.jsx";
import ChatMessageInput from "../features/RealTime/ChatMessageInput.jsx";
import { useDoctorInfo } from "../features/Doctors/useDoctorInfo";

//

import { toast } from "react-hot-toast";

function ChatPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const auth = useAuthUser();
  const currentUser = auth()?.user;

  // Get patient and peer doctor from location state
  const { patient, peerDoctor: initialPeerDoctor } = location.state || {};

  // Fetch current doctor's full info from database to get the real _id
  const { doctorInfo, isLoading: isDoctorInfoLoading } = useDoctorInfo();

  // Get current user ID - Use the real doctor _id from database, not JWT userId
  const currentUserId = doctorInfo?._id || currentUser?._id || currentUser?.id;

  // State
  const [peerDoctor, setPeerDoctor] = useState(initialPeerDoctor || null);
  const [patientData, setPatientData] = useState(patient || null);

  console.log("========================================");
  console.log("💬 ChatPage - Initialization");
  console.log("========================================");
  console.log("🆔 Room ID:", roomId);
  console.log("👤 Current User (JWT):", currentUser);
  console.log("👨‍⚕️ Current Doctor Info (Database):", doctorInfo);
  console.log(
    "🆔 Current User ID (Computed - Using Real Doctor _id):",
    currentUserId
  );
  console.log("🔍 ID Sources:", {
    doctorInfoId: doctorInfo?._id,
    jwtUserId: currentUser?.userId,
    currentUser_id: currentUser?._id,
    currentUserId: currentUser?.id,
  });
  console.log("👨‍⚕️ Initial Peer Doctor:", initialPeerDoctor);
  console.log("👥 Patient:", patient);
  console.log("========================================");

  // 1️⃣ Fetch initial messages via REST
  const { data: messages = [], isLoading } = useMessagesQuery(roomId);

  // 2️⃣ Start socket lifecycle
  const { isConnected } = useChatSocket(roomId, currentUserId);

  // 3️⃣ File upload hook
  const { uploadFiles, isUploading } = useFileUpload(roomId);

  // 4️⃣ Typing indicator
  const { typingUsers, emitTyping, emitStopTyping } = useTypingIndicator(
    roomId,
    currentUserId
  );

  // Load peer doctor and patient details if not provided
  useEffect(() => {
    const loadDetails = async () => {
      // If we already have peer doctor from navigation state, no need to fetch
      if (initialPeerDoctor) {
        console.log("Using peer doctor from navigation state");
        return;
      }

      try {
        console.log("Loading details for roomId:", roomId);

        // Try to extract IDs from roomId format: room_doctorA_doctorB_patientId
        const parts = roomId?.replace("room_", "").split("_");
        console.log("Room parts:", parts);

        if (parts && parts.length >= 3) {
          const [doctorAId, doctorBId, patientId] = parts;
          const peerDoctorId =
            doctorAId === currentUserId ? doctorBId : doctorAId;

          console.log("Peer doctor ID:", peerDoctorId);

          // Load peer doctor if not provided
          if (!peerDoctor && peerDoctorId) {
            console.log("Fetching doctor details for:", peerDoctorId);
            const doctorData = await getDoctorDetails(peerDoctorId);
            console.log("Doctor data received:", doctorData);
            setPeerDoctor(doctorData);
          }

          // Load patient if not provided
          if (!patientData && patientId) {
            console.log("Fetching patient details for:", patientId);
            const patData = await getPatientDetails(patientId);
            console.log("Patient data received:", patData);
            setPatientData(patData);
          }
        } else {
          console.warn(
            "RoomId doesn't match expected format, using provided data"
          );
        }
      } catch (error) {
        console.error("Failed to load details:", error);
        toast.error("Failed to load chat details");
      }
    };

    if (roomId && currentUserId) {
      loadDetails();
    }
  }, [roomId, currentUserId, peerDoctor, patientData, initialPeerDoctor]);

  // 5️⃣ Send text message
  const sendMessage = (text) => {
    console.log("🚀 Attempting to send message:", text);

    if (!text.trim()) {
      console.warn("⚠️ Empty message, not sending");
      return;
    }

    emitStopTyping();

    const messageData = {
      roomId,
      content: text,
      messageType: "text",
      senderId: currentUserId, // Explicitly include sender ID
    };

    console.log("📤 Emitting send_message event:", messageData);
    console.log("📤 Sender ID being sent:", currentUserId);

    chatSocket.emit("send_message", messageData);

    console.log("✅ Message emitted to socket");
  };

  // 6️⃣ Handle file upload with message
  const handleFileUpload = async (files, text) => {
    try {
      emitStopTyping();
      await uploadFiles(files, text);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload files. Please try again.");
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Please log in to access chat.</p>
      </div>
    );
  }

  // Show loading while fetching doctor info
  if (isDoctorInfoLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <ChatHeader
        peerDoctor={peerDoctor}
        patient={patientData}
        isOnline={isConnected}
      />

      {/* Messages */}
      <ChatMessageList
        messages={messages}
        currentDoctorId={currentUserId}
        currentDoctor={doctorInfo || currentUser}
        peerDoctor={peerDoctor}
        typingUsers={typingUsers}
        isLoading={isLoading}
      />

      {/* Input */}
      <ChatMessageInput
        onSend={sendMessage}
        onFileUpload={handleFileUpload}
        onTyping={emitTyping}
        onStopTyping={emitStopTyping}
        disabled={false}
        isUploading={isUploading}
      />
    </div>
  );
}

export default ChatPage;
