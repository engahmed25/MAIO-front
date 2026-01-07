import { useState, useEffect, useRef } from "react";
import { chatSocket } from "../RealTime/socket.js";

export const useTypingIndicator = (roomId, currentDoctorId) => {
  const [typingUsers, setTypingUsers] = useState([]);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    // Listen for typing events
    chatSocket.on("typing", ({ doctorId, doctorName }) => {
      if (doctorId === currentDoctorId) return;

      setTypingUsers((prev) => {
        if (prev.find((u) => u.doctorId === doctorId)) return prev;
        return [...prev, { doctorId, doctorName }];
      });
    });

    chatSocket.on("stop_typing", ({ doctorId }) => {
      setTypingUsers((prev) => prev.filter((u) => u.doctorId !== doctorId));
    });

    return () => {
      chatSocket.off("typing");
      chatSocket.off("stop_typing");
    };
  }, [roomId, currentDoctorId]);

  const emitTyping = () => {
    chatSocket.emit("typing", {
      roomId,
      doctorId: currentDoctorId,
    });

    // Auto stop typing after 3 seconds
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping();
    }, 3000);
  };

  const emitStopTyping = () => {
    chatSocket.emit("stop_typing", {
      roomId,
      doctorId: currentDoctorId,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  return {
    typingUsers,
    emitTyping,
    emitStopTyping,
  };
};
