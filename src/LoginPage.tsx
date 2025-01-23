import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useLoginRequest } from "./useLogInRequest"
import { useChatStore } from "./useChatStore"
import './index.css'

export const LoginPage = () => {
  const { loginRequest } = useLoginRequest()
  const { loading, setError, error, clearError } = useChatStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const formSubmit = async (e) => {
    e.preventDefault()
    clearError()

    if (username.trim() === '' || password.length < 4) {
      alert('Please enter a valid username and password')
      return
    }

    try {
      const response = await loginRequest({ username, password })

      setIsLoggedIn(true)
    } catch (error) {
      console.error('Error logging in: ', error)
      setError(error?.data?.message || 'Login failed. Please try again.')
    }
    
  }

  if(loading) {
    return <div><p>Logging In...</p></div>
  }

  if(isLoggedIn) {
    return <Navigate to='/chat'/>
  }

  return (
    <main className="min-h-screen grid place-items-center bordr-red-600">
      <div>

    <h1 className="text-6xl font-bold">Welcome to
      <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Behas</span>
    </h1>

    <form className="border-b-2 mb-4 p-4" onSubmit={formSubmit}>

      <div className="mb-4">
        <label htmlFor="username" className="block font-bold mb-1">Username:</label>
        <input type="text"
          name="username"
          id="username"
          className="bg-transparent border border-white rounded px-2 py-1 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          required/>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block font-bold mb-1">Password:</label>
        <input type="password"
          name="password"
          id="password"
          className="bg-transparent border border-white rounded px-2 py-1 w-full"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required/>
      </div>

      <button 
      type="submit"
      className="bg-yellow-500 hover:bg-yellow-600 border-none rounded-md text-black px-2 py-1"
      disabled={loading}>Log In</button>
    </form>

    <span>Don't have an account? <Link to='/signup' className="underline text-blue-500 hover:text-blue-700"> Sign Up</Link></span>
    
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </main>
  )
}

