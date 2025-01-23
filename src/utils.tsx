import { useNavigate } from "react-router-dom";
import { useChatStore } from "./useChatStore";

export const storeAccessToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const storeRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const storeUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const handleLogout = () => {
  const { disconnectSocket } = useChatStore();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // see if you should remove userid as well
    localStorage.removeItem("userId");

    disconnectSocket();

    navigate("/");
  };
  return { logout };
};

export const refreshAccessToken = () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return console.error("User is not logged in");

  try {
    // make request to the BE with the refreshtoken attached to get another access token and then just simply return the token
    // use this function in the fetch request for the data from the BE like friends, messages, etc
  } catch (error) {
    console.error(error);
  }
};
