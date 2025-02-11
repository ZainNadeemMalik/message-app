import { useCallback, useEffect, useState } from "react";
import axios from "redaxios";
import { Link, useParams } from "react-router-dom";
import { useChatStore } from "./useChatStore";
import { Message } from "./types";

const ChatPage = () => {
  const { friendId, friendUsername } = useParams();
  const { socket, loading, initializeSocket } = useChatStore();
  const userId = localStorage.getItem("userId");

  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = useCallback(async () => {
    if (!userId || !friendId) return;

    try {
      const result = await axios.get(
        `https://message-app-backend-production.up.railway.app/fetchMessages/${userId}/${friendId}`,
      );

      setMessages(result.data || []);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  }, [userId, friendId]);

  useEffect(() => {
    if (!socket) {
      console.log("socket is not init");
      if (userId) {
        initializeSocket(parseInt(userId));
      }
      return;
    }

    fetchMessages();

    socket.on("newMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [fetchMessages, userId, friendId, socket, initializeSocket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        content: newMessage,
        senderId: userId,
        recipientId: friendId,
      };

      if (socket) {
        socket.emit("newMessage", messageData);
        setNewMessage("");
      }
    }
  };

  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!friendId) {
    return (
      <div className="p-2 text-center">
        <p className="font-bold text-6xl mb-4">
          Select a friend to start a conversation.
        </p>
        <Link
          to="/users"
          className="underline text-blue-500 hover:text-blue-700"
        >
          Find new friends
        </Link>
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col h-full">
      <h2 className="text-4xl">
        Chatting with:{" "}
        <span className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          {friendUsername}
        </span>
      </h2>

      <div className="messages flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            className="mb-2 flex flex-col"
            key={message.id}
            style={{
              textAlign:
                message.senderId.toString() === userId ? "right" : "left",
            }}
          >
            <span className="text-lg block">{message.content}</span>
            <strong className="text-xs text-gray-500">
              {message.senderId.toString() === userId ? "Sent" : "Recieved"}
            </strong>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => handelKeyDown(e)}
          className="bg-transparent border rounded px-4 py-2 flex-1"
          placeholder="Type your message here..."
        />

        <button
          type="button"
          onClick={sendMessage}
          className="px-4 py-2 border-none bg-blue-400 hover:bg-blue-600 text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
