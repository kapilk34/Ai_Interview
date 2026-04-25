import { useState } from "react";
import { useSelector } from "react-redux";
import { BsRobot } from "react-icons/bs";
import { Menu, X } from "lucide-react";

function NavBar() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between m-5 border-none rounded-xl ">
        <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 rounded-xl">
                <BsRobot size={20} />
            </div>
            <h1 className="text-xl font-medium text-gray-800">Ai_Interview</h1>
        </div>
    </div>
  );
}

export default NavBar;