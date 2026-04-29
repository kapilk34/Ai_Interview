import { BsRobot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import { ServerUrl } from "../App";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setUserData, clearReturnTo } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

// Email validation utility
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function Auth() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const returnTo = useSelector((state) => state.user.returnTo)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrorMessage("")
    
    // Real-time email validation
    if (name === "email" && value) {
      if (!isValidEmail(value)) {
        setEmailError("Please enter a valid email address")
      } else {
        setEmailError("")
      }
    } else if (name === "email" && !value) {
      setEmailError("")
    }
  }

  const redirectUser = () => {
    setTimeout(() => {
      if (returnTo) {
        dispatch(clearReturnTo())
        navigate(returnTo)
      } else {
        navigate("/")
      }
    }, 1500)
  }

  const handleGoogleAuth = async ()=>{
    if (loading) return; 
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await signInWithPopup(auth, provider)
      let User =  response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + "/api/auth/google", {name, email}, {withCredentials:true})
      dispatch(setUserData(result.data))
      
      // Show success message
      setSuccessMessage("Login successful! Redirecting...")
      redirectUser()
    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
      setErrorMessage("Google authentication failed. Please try again.")
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (loading) return
    
    setLoading(true)
    setErrorMessage("")

    try {
      const { name, email, password, confirmPassword } = formData
      
      if (!name || !email || !password || !confirmPassword) {
        setErrorMessage("All fields are required")
        setLoading(false)
        return
      }

      // Validate email format
      if (!isValidEmail(email)) {
        setErrorMessage("Please enter a valid email address")
        setLoading(false)
        return
      }

      const result = await axios.post(
        ServerUrl + "/api/auth/register",
        { name, email, password, confirmPassword },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data.user))
      setSuccessMessage("Registration successful! Redirecting...")
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      redirectUser()
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.")
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (loading) return
    
    setLoading(true)
    setErrorMessage("")

    try {
      const { email, password } = formData
      
      if (!email || !password) {
        setErrorMessage("Email and password are required")
        setLoading(false)
        return
      }

      // Validate email format
      if (!isValidEmail(email)) {
        setErrorMessage("Please enter a valid email address")
        setLoading(false)
        return
      }

      const result = await axios.post(
        ServerUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data.user))
      setSuccessMessage("Login successful! Redirecting...")
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      redirectUser()
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Success Message Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          {successMessage}
        </div>
      )}
      
      {/* Error Message Toast */}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px]">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg text-xl">
            <BsRobot />
          </div>
          <h2 className="font-semibold text-xl">AI Interview</h2>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>

        {/* Google Sign In Button */}
        <button 
          onClick={handleGoogleAuth} 
          disabled={loading} 
          className="w-full flex items-center justify-center gap-2 bg-black text-white border border-gray-300 py-2 rounded-lg hover:bg-gray-800 transition mb-4 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <FcGoogle className="text-xl" />
          {loading ? "Logging in..." : "Continue with Google"}
        </button>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email/Password Form */}
        <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 ${
              emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm -mt-2">{emailError}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
            />
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right text-sm text-gray-500 hover:text-black cursor-pointer">
              Forgot Password?
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <p className="text-sm text-center mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin)
              setErrorMessage("")
              setSuccessMessage("")
              setFormData({ name: "", email: "", password: "", confirmPassword: "" })
            }}
            className="ml-1 text-black font-medium cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Auth;