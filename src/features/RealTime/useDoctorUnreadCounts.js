import { useQuery } from "@tanstack/react-query";
import { getMyRoomsWithUnreadCounts } from "../../services/apiChat";

/**
 * Hook to fetch all chat rooms with their unread message counts
 * Returns a map of doctorId -> unreadCount for easy lookup
 */
export function useDoctorUnreadCounts() {
    const { data: rooms = [], isLoading, error } = useQuery({
        queryKey: ["chat-rooms-unread"],
        queryFn: getMyRoomsWithUnreadCounts,
        staleTime: 30000, // Consider data fresh for 30 seconds
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    console.log('🔔 useDoctorUnreadCounts - Rooms data:', rooms);

    // Create a map of doctorId -> unreadCount for easy lookup
    const unreadCountsByDoctor = {};

    rooms.forEach(room => {
        // Room has doctorA and doctorB fields (or sometimes doctorAId/doctorBId)
        const doctorAId = room.doctorA || room.doctorAId;
        const doctorBId = room.doctorB || room.doctorBId;

        // Add unread count for both doctors in the room
        if (doctorAId) {
            const idStr = doctorAId.toString ? doctorAId.toString() : doctorAId;
            unreadCountsByDoctor[idStr] = (unreadCountsByDoctor[idStr] || 0) + (room.unreadCount || 0);
        }
        if (doctorBId) {
            const idStr = doctorBId.toString ? doctorBId.toString() : doctorBId;
            unreadCountsByDoctor[idStr] = (unreadCountsByDoctor[idStr] || 0) + (room.unreadCount || 0);
        }

        // Alternative: extract from room ID if format is room_doctorA_doctorB_patientId
        if (!doctorAId && !doctorBId && room._id && room._id.includes('_')) {
            const parts = room._id.replace('room_', '').split('_');
            if (parts.length >= 2) {
                const [docAId, docBId] = parts;
                unreadCountsByDoctor[docAId] = (unreadCountsByDoctor[docAId] || 0) + (room.unreadCount || 0);
                unreadCountsByDoctor[docBId] = (unreadCountsByDoctor[docBId] || 0) + (room.unreadCount || 0);
            }
        }
    });

    // Total unread count across all rooms
    const totalUnreadCount = rooms.reduce((sum, room) => sum + (room.unreadCount || 0), 0);

    console.log('🔔 useDoctorUnreadCounts - Unread counts by doctor:', unreadCountsByDoctor);
    console.log('🔔 useDoctorUnreadCounts - Total unread:', totalUnreadCount);

    return {
        rooms,
        unreadCountsByDoctor,
        totalUnreadCount,
        isLoading,
        error,
    };
}
