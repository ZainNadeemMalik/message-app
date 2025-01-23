import { create } from "zustand";
import { io } from "socket.io-client";

export const useChatStore = create((set) => ({
  socket: null,
  error: null,
  loading: null,
  friends: [],
  setFriends: (friends) => set({ friends }),
  addFriend: (friend) => set((state) => ({ friends: [...state.friends, friend] })),
  removeFriend: (friendId) => set((state) => ({ friends: state.friends.filter(friend => friend.id !== friendId) })),

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ loading }),
  // set the types after logging out the response objects to see what they are and if you need any parseInts to make them work correctly
  initializeSocket: (userId) => {
    set({ loading: true })
    // put an env in the url below
    const socket = io('http://localhost:3000', { withCredentials: true });

    socket.on('connect', () => {
      console.log('User connected:', socket.id)
      socket.emit('register', userId)
      set({ socket, loading: false })
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
      set({ socket: null })
    })
  },

  disconnectSocket: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null }
    })
  }
}))