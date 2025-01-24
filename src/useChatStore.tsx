import { create } from "zustand";
import { io } from "socket.io-client";
import { Friend, ChatStoreState } from "./types";

export const useChatStore = create<ChatStoreState>((set) => ({
  socket: null,
  error: null,
  loading: null,
  friends: [],
  setFriends: (friends: Friend[]) => set({ friends }),
  addFriend: (friend: Friend) =>
    set((state) => ({ friends: [...state.friends, friend] })),
  removeFriend: (friendId: number) =>
    set((state) => ({
      friends: state.friends.filter((friend) => friend.id !== friendId),
    })),

  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ loading }),
  // set the types after logging out the response objects to see what they are and if you need any parseInts to make them work correctly
  initializeSocket: (userId: number) => {
    set({ loading: true });
    // put an env in the url below
    const socket = io("http://message-app-backend-production.up.railway.app", { withCredentials: true });

    socket.on("connect", () => {
      console.log("User connected:", socket.id);
      socket.emit("register", userId);
      set({ socket, loading: false });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ socket: null });
    });
  },

  disconnectSocket: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));
