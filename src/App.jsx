import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setReturnTo, setAuthLoading, setSessionExpired } from "./redux/userSlice";

export const ServerUrl = "http://localhost:5000"

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);

  // Show loading screen while checking authentication
  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  // Redirect to auth only if not loading and user is not authenticated
  if (!userData) {
    // Save the location user is trying to access
    dispatch(setReturnTo(location.pathname));
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch()
  const sessionExpired = useSelector((state) => state.user.sessionExpired)
  const [showSessionExpiredMessage, setShowSessionExpiredMessage] = useState(false)
  
  // Setup axios interceptor for handling 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
          dispatch(setUserData(null))
          dispatch(setSessionExpired(true))
          // Show session expired message for 3 seconds
          setShowSessionExpiredMessage(true)
          setTimeout(() => setShowSessionExpiredMessage(false), 3000)
        }
        return Promise.reject(error)
      }
    )

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor)
    }
  }, [dispatch])
  
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials: true})
        dispatch(setUserData(result.data))
        dispatch(setSessionExpired(false))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      } finally {
        // Mark authentication check as complete regardless of success/failure
        dispatch(setAuthLoading(false))
      }
    }
    getUser()
  }, [dispatch])
  
  return (
    <>
      {/* Session Expired Toast */}
      {showSessionExpiredMessage && (
        <div className="fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Your session has expired. Please login again.
        </div>
      )}
      
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </>
  )
}

export default App
