import { MessageCircle } from "lucide-react";

export default function DoctorChatButton() {
  return (
    <>
      {/* Doctor Chat Button */}
      <button className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap">
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Doctor Chat</span>
        <span className="sm:hidden">Chat</span>
      </button>
    </>
  );
}
