import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setReturnTo } from "./redux/userSlice";

export const ServerUrl = "http://localhost:5000"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  if (!userData) {
    // Save the location user is trying to access
    dispatch(setReturnTo(location.pathname));
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials: true})
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()
  }, [dispatch])
  
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
  )
}

export default App
