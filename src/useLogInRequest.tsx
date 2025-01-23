import axios from "redaxios";
import { storeAccessToken, storeRefreshToken, storeUserId } from "./utils";
import { useChatStore } from "./useChatStore";

export const useLoginRequest = (options = {}) => {

  const { setLoading, setError, initializeSocket } = useChatStore()
  const loginRequest = async (body) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/login', body, options);
      storeAccessToken(response.data.accessToken)
      storeRefreshToken(response.data.refreshToken)
      storeUserId(response.data.userId)
      initializeSocket(parseInt(response.data.userId))

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loginRequest };
};



