import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'redaxios'
import { handleLogout } from "./utils"
import { useChatStore } from "./useChatStore"

export const FriendsSideBar = () => {
  const { friends, setFriends, removeFriend } = useChatStore()
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const { logout } = handleLogout()

  useEffect(() => {
    const fetchFriends = async () => {
      try {

        const result = await axios.get(`http://localhost:3000/fetchFriends/${userId}`)

        setFriends(result.data)

      } catch (error) {
        console.error('Error fetching friends: ', error)
      }
    }
    fetchFriends()
  }, [userId, setFriends])

  const openChat = (friendId: string, friendUsername) => {
    navigate(`/chat/${userId}/${friendId}/${friendUsername}`)
  }



  return (
    <aside className="p-4 border-r flex flex-col min-h-screen">

      <h3 className="text-4xl mb-4 font-bold">Friends</h3>

      <ul className="">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-2  mb-2">
            <li onClick={() => openChat(friend.id, friend.username)} className="cursor-pointer rounded p-2 flex-1 hover:bg-slate-800">
              {friend.username}</li>
            <button onClick={() => removeFriend(friend.id)} 
            className="hover:bg-red-700 hover:text-black px-2 border rounded">X</button>
          </div>
        ))}
      </ul>

      <div className="mt-auto p-2">
        <a href="/users" className="block mb-2 text-blue-500 hover:text-blue-700 underline">Find new friends</a>
        <button onClick={() => logout()} className="w-full py-2 border rounded hover:bg-red-700  hover:text-black">Log Out</button>
      </div>

    </aside>
  )
}