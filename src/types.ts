import { Socket } from "socket.io-client";

// Types for User objects (sender or recipient)
export interface User {
  id: number;
  username: string;
  createdAt: string;
}

// Type for Message
export interface Message {
  id: number;
  content: string;
  createdAt?: string; // Dates are typically returned as ISO strings from the backend
  isRead?: boolean;
  type?: "sent" | "received"; // Distinguishes between sent and received messages
  sender?: User; // Present only in received messages
  recipient?: User; // Present only in sent messages
  senderId: number;
}

export interface SocketMessage {
  id: number;
  senderId: number;
  content: string;
}

// Define the structure for a Friend
export interface Friend {
  id: number;
  username: string;
  createdAt: string;
}

export interface ChatStoreState {
  socket: Socket | null; // Socket is from "socket.io-client"
  error: string | null;
  loading: boolean | null;
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: number) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initializeSocket: (userId: number) => void;
  disconnectSocket: () => void;
}

export interface LoginBody {
  username: string;
  password: string;
}
