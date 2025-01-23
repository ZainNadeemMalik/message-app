import { useEffect, useState } from "react"
import axios from 'redaxios'
import { useChatStore } from "./useChatStore"

export const Users = () => {
  const [users, setUsers] = useState([])
  const { addFriend } = useChatStore()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchUsers = async () => {
    try {
      const result = await axios.get('http://localhost:3000/fetchUsers')
      // so you don't show up in the list for potential friends
      const filteredUsers = result.data.filter(user => user.id != userId)
      console.log('filteredusers:', filteredUsers)
      console.log('userid', userId)
      setUsers(filteredUsers)
      } catch (error) {
      console.log(error)
    }
  }
    fetchUsers()
}, [userId])

  const addNewFriend = async (friendId) => {
    const friend = users.find(user => user.id === friendId)

    try {
      const response = await axios.post('http://localhost:3000/addFriend', {
        userId,
        friendId
      })

      addFriend(friend)

      alert('Friend added successfully')
    } catch (error) {
      console.error(error, 'Error from users page while adding friend')
      // alerts work fine for now but eventually change them to toasts
      alert(error.data.error || 'Error adding friend')
    }
  }
// after you've added a user as a friend either make them disappear from the users rendered or change the add friend button to a unclickable cross or maybe just don't render the add friend button next to them or something else that might be easier
  return (
    <div className="text-center">
    <h1 className="text-6xl font-bold mb-4">Add a friend to chat with</h1>

    <ul className="mb-6">
      {users.map(user => (
        <li key={user.id} className="flex gap-2 items-center mb-2 w-full px-10">
          <p>{user.username}</p>
          <button onClick={() => addNewFriend(user.id)} 
          className="px-2 py-1 rounded bg-green-500 hover:bg-green-700 text-black ml-auto">Add friend</button>
        </li>
      )
        )}
    </ul>
    <a href="/chat" className="underline text-blue-500 hover:text-blue-700">Chat Page</a>
    </div>
  )
}