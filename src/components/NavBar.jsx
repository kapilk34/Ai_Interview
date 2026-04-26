import { useSelector } from "react-redux";
import { BsCoin, BsRobot } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdLogout, MdHistory } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg px-6 py-3 flex items-center justify-between m-5 rounded-2xl border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-black to-gray-700 text-white p-2 rounded-xl shadow">
          <BsRobot size={18} />
        </div>
        <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
          Ai Interview
        </h1>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            onClick={() => {
              setShowCreditPopup(!showCreditPopup);
              setShowUserPopup(false);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200"
          >
            <BsCoin className="text-yellow-500" />
            <span>{userData?.credits || 0}</span>
          </button>

          {showCreditPopup && (
            <div className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-4 text-sm z-50 animate-fadeIn">
              <p className="font-semibold text-gray-800">Your Credits</p>
              <p className="text-gray-600 mt-1">
                Available:{" "}
                <span className="font-bold text-black">
                  {userData?.credits || 0}
                </span>
              </p>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                Buy More
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowUserPopup(!showUserPopup);
              setShowCreditPopup(false);
            }}
            className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-full text-white flex items-center justify-center font-semibold shadow hover:scale-105 transition"
          >
            {userData?.name
              ? userData.name.charAt(0).toUpperCase()
              : <FaUser />}
          </button>

          {showUserPopup && (
            <div className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-4 text-sm z-50 animate-fadeIn">
              <div className="mb-3">
                <p className="font-semibold text-gray-800">
                  {userData?.name || "User"}
                </p>
                <p className="text-gray-500 text-xs">
                  {userData?.email}
                </p>
              </div>

              <div className="border-t pt-3 flex flex-col gap-2">
                <button
                  onClick={() => navigate("/history")}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                >
                  <MdHistory />
                  Interview History
                </button>

                <button
                  className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                >
                  <MdLogout />
                  Logout
                </button>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default NavBar;