import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function AdminPage()
{
    return(
        <div className="w-full h-screen flex">
            <div class="w-[400px] h-full bg-green-200">
                <button className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <RxDashboard/>
                    Dashboard
                </button>
                <button className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <FaRegBookmark/>
                    Bookings
                </button>
                <button className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <MdOutlineSpeaker/>
                    Items
                </button>
                <button className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <FaRegUser/>
                    Users
                </button>
            </div>
            <div className="w-full bg-red-900">
                

            </div>
        
    </div>
    )
}