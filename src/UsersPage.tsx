import { useEffect, useState } from "react";
import axios from "redaxios";
import { useChatStore } from "./useChatStore";
import { User } from "./types";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { addFriend } = useChatStore();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get<User[]>(
          "https://message-app-backend-production.up.railway.app/fetchUsers",
        );
        if (userId) {
          const userIdNumber = parseInt(userId);

          // so you don't show up in the list for potential friends
          const filteredUsers = result.data.filter(
            (user) => user.id != userIdNumber,
          );

          console.log("filteredusers:", filteredUsers);
          console.log("userid", userId);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [userId]);

  const addNewFriend = async (friendId: number) => {
    const friend = users.find((user) => user.id === friendId);

    try {
      const response = await axios.post("https://message-app-backend-production.up.railway.app/addFriend", {
        userId,
        friendId,
      });
      console.log(response);
      if (friend) {
        addFriend(friend);
      }

      alert("Friend added successfully");
    } catch (error) {
      console.error(error, "Error from users page while adding friend");
      // alerts work fine for now but eventually change them to toasts
      //error.data.error
      alert("Error adding friend");
    }
  };
  // after you've added a user as a friend either make them disappear from the users rendered or change the add friend button to a unclickable cross or maybe just don't render the add friend button next to them or something else that might be easier
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">Add a friend to chat with</h1>

      <ul className="mb-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex gap-2 items-center mb-2 w-full px-10"
          >
            <p>{user.username}</p>
            <button
              onClick={() => addNewFriend(user.id)}
              className="px-2 py-1 rounded bg-green-500 hover:bg-green-700 text-black ml-auto"
            >
              Add friend
            </button>
          </li>
        ))}
      </ul>
      <Link to="/chat" className="underline text-blue-500 hover:text-blue-700">
        Chat Page
      </Link>
    </div>
  );
};
