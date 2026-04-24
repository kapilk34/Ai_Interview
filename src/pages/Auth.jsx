import { BsRobot } from "react-icons/bs"

function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[300px] text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-black text-white p-2 rounded-lg">
                    <BsRobot/>
                </div>
                <h2 className="font-semibold text-lg">AI Interview</h2>
            </div>
        </div>
    </div>
  )
}

export default Auth