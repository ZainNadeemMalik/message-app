import axios from "redaxios";
import { storeAccessToken, storeRefreshToken, storeUserId } from "./utils";
import { useChatStore } from "./useChatStore";
import { LoginBody as SignUpBody } from "./types";

const useSignUpRequest = (options = {}) => {
  const { setLoading, setError, initializeSocket } = useChatStore();
  const signUpRequest = async (body: SignUpBody) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://message-app-backend-production.up.railway.app/signup",
        body,
        options,
      );
      storeAccessToken(response.data.accessToken);

      storeRefreshToken(response.data.refreshToken);

      storeUserId(response.data.userId);

      initializeSocket(parseInt(response.data.userId));

      return response.data;
    } catch (err) {
      throw err; // Rethrow if the caller needs to handle it
    } finally {
      setLoading(false);
    }
  };

  return { signUpRequest };
};

export default useSignUpRequest;
