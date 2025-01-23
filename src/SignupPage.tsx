import { FormEvent, useState } from "react";
import useSignUpRequest from "./useSignUpRequest";
import { Link, Navigate } from "react-router-dom";
import { useChatStore } from "./useChatStore";

export const SignupPage = () => {
  const { signUpRequest } = useSignUpRequest();
  const { loading, setError, error, clearError } = useChatStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (username.trim() === "" || password.length < 4) {
      alert("Please enter a valid username and password");
      return;
    }

    try {
      const response = await signUpRequest({ username, password });
      if (response) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error signing up: ", error);
      // error?.data?.message
      setError("Error while signing up");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/chat" />;
  }

  return (
    <main className="min-h-screen grid place-items-center bordr-red-600">
      <div>
        <h1 className="text-6xl font-bold">
          Become a part of
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            {" "}
            Behas
          </span>
        </h1>
        <form className="border-b-2 mb-4 p-4" onSubmit={formSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-transparent border border-white rounded px-2 py-1 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-transparent border border-white rounded px-2 py-1 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 border-none rounded-md text-black px-2 py-1"
            disabled={loading || false}
          >
            Sign Up
          </button>
        </form>

        <span>
          Already have an account?{" "}
          <Link className="underline text-blue-500 hover:text-blue-700" to="/">
            {" "}
            Log In
          </Link>
        </span>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
};
