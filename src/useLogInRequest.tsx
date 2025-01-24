import axios from "redaxios";
import { storeAccessToken, storeRefreshToken, storeUserId } from "./utils";
import { useChatStore } from "./useChatStore";
import { LoginBody } from "./types";
export const useLoginRequest = (options = {}) => {
  const { setLoading, setError, initializeSocket } = useChatStore();
  const loginRequest = async (body: LoginBody) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://message-app-backend-production.up.railway.app/login",
        body,
        options,
      );
      storeAccessToken(response.data.accessToken);
      storeRefreshToken(response.data.refreshToken);
      storeUserId(response.data.userId);
      initializeSocket(parseInt(response.data.userId));

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loginRequest };
};
