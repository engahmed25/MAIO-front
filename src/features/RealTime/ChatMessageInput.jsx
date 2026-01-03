import React, { useState, useRef } from "react";
import { Send, Paperclip, Image as ImageIcon, X, Smile } from "lucide-react";
import ChatImagePreview from "../../features/RealTime/ChatImagePreview.jsx";

function ChatMessageInput({ onSend, onFileUpload, disabled, isUploading }) {
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSend = async () => {
    if ((!text.trim() && selectedFiles.length === 0) || disabled) return;

    // If there are files, upload them first
    if (selectedFiles.length > 0) {
      await onFileUpload(selectedFiles, text.trim());
      setSelectedFiles([]);
    } else {
      // Just send text message
      onSend(text);
    }

    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border-t border-gray-200">
      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex gap-2 flex-wrap">
            {selectedFiles.map((file, index) => (
              <ChatImagePreview
                key={index}
                file={file}
                onRemove={() => removeFile(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 flex items-center  gap-2">
        {/* Attachment Buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => imageInputRef.current?.click()}
            disabled={disabled || isUploading}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            title="Upload Image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            title="Upload File"
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>

        {/* Text Input */}
        <div className="flex-1 flex relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled || isUploading}
            rows={1}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={
            (!text.trim() && selectedFiles.length === 0) ||
            disabled ||
            isUploading
          }
          className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>

        {/* Hidden File Inputs */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ChatMessageInput;
