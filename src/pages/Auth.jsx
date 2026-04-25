import { BsRobot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import { ServerUrl } from "../App";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Auth() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const handleGoogleAuth = async ()=>{
    if (loading) return; 
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider)
      let User =  response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + "/api/auth/google", {name, email}, {withCredentials:true})
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px]">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg text-xl">
            <BsRobot />
          </div>
          <h2 className="font-semibold text-xl">AI Interview</h2>
        </div>

        <h1 className="text-2xl font-semibold  text-center mb-4">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>

        <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-2 bg-black text-white border border-gray-300 py-2 rounded-lg hover:bg-gray-800 transition mb-4">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right text-sm text-gray-500 hover:text-black cursor-pointer">
              Forgot Password?
            </div>
          )}

          {/* Submit Button */}
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <p className="text-sm text-center mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
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