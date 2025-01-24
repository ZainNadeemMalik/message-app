import App from "./App";
import { RouteObject } from "react-router-dom";
import { SignupPage } from "./SignupPage";
import ChatPage from "./ChatPage";
import { Users } from "./UsersPage";
import { FriendsSideBar } from "./FriendsSidebar";
import Layout from "./Layout";

const Routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/chat",
    element: <Layout />,
    children: [
      { path: "", element: <ChatPage /> },
      { path: ":friendId", element: <ChatPage /> },
      { path: ":userId/:friendId", element: <ChatPage /> },
      { path: ":userId/:friendId/:friendUsername", element: <ChatPage /> },
    ],
  },
  {
    path: "/users",
    element: <Layout />,
    children: [
      { path: "", element: <Users /> },
    ]
  },
  {
    path: "/f",
    element: <FriendsSideBar />,
  },
  // {
  //   path: '*',
  //   element: <ErrorPage />
  // }
];

export default Routes;
